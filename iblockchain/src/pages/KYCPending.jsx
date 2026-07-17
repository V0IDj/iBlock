import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Shield, Clock } from "lucide-react";

export function KYCPending() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 mesh-bg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="glass-card text-center">
          <CardHeader>
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <CardTitle className="text-2xl">KYC Pending</CardTitle>
            <CardDescription>
              Your documents are being reviewed. This usually takes 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="premium" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
