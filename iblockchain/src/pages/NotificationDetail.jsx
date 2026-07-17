import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { ArrowLeft } from "lucide-react";

export function NotificationDetail() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (id) {
      supabase
        .from("notifications")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => setNotification(data));
    }
  }, [id]);

  if (!notification) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>{notification.title}</CardTitle>
              <CardDescription>
                {new Date(notification.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{notification.message}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
