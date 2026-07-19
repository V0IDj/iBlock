import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function useTracking(user) {
  const location = useLocation();
  const sessionIdRef = useRef(null);
  const heartbeatRef = useRef(null);
  const prevPathRef = useRef("");

  const getSessionId = () => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    }
    return sessionIdRef.current;
  };

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";
    if (ua.includes("Windows NT 10")) os = "Windows 10/11";
    else if (ua.includes("Windows NT")) os = "Windows";
    else if (ua.includes("Mac OS X")) os = "macOS";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("Linux")) os = "Linux";
    return {
      device: ua,
      browser,
      os,
      screen_resolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  const heartbeat = useCallback(async () => {
    if (!user) return;
    const info = getDeviceInfo();
    try {
      await supabase.rpc("upsert_session_heartbeat", {
        _session_id: getSessionId(),
        _device: info.device,
        _browser: info.browser,
        _os: info.os,
        _screen_resolution: info.screen_resolution,
        _language: info.language,
        _timezone: info.timezone,
      });
    } catch (e) {
      // tracking should never break the app
    }
  }, [user]);

  useEffect(() => {
    if (!user || location.pathname === prevPathRef.current) return;
    prevPathRef.current = location.pathname;
    supabase.rpc("log_user_activity", {
      _user_id: user.id,
      _activity_type: "page_view",
      _details: { path: location.pathname },
      _page_url: location.pathname,
    }).catch(() => {});
  }, [user, location.pathname]);

  useEffect(() => {
    if (!user) return;
    const uid = user.id;
    heartbeat();
    heartbeatRef.current = setInterval(heartbeat, 30000);
    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      const sid = sessionIdRef.current;
      if (sid) {
        supabase.from("user_sessions").update({ is_active: false, last_seen: new Date().toISOString() })
          .eq("session_id", sid)
          .eq("user_id", uid)
          .catch(() => {});
      }
    };
  }, [user, heartbeat]);
}
