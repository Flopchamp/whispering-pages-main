import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase, type Poem, type ContactSubmission } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut, Plus, Edit, Trash2, Loader2, Mail, KeyRound, ArrowLeft } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Admin = () => {
  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"login" | "forgot-password" | "reset-password">("login");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [poemToDelete, setPoemToDelete] = useState<string | null>(null);
  const [showPoemForm, setShowPoemForm] = useState(false);
  const [poemForm, setPoemForm] = useState({
    title: "",
    content: "",
    theme: "",
  });

  const themes = [
    "Love & Relationships",
    "Life & Wisdom",
    "Nature & Beauty",
    "Growth & Learning",
    "Emotions & Healing",
  ];

  useEffect(() => {
    if (!lockoutUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setLockoutSeconds(0);
      } else {
        setLockoutSeconds(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setView("reset-password");
      } else {
        setUser(session?.user ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: poems = [], isLoading: poemsLoading } = useQuery({
    queryKey: ["poems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Poem[];
    },
    enabled: !!user,
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const isLockedOut = lockoutUntil !== null && Date.now() < lockoutUntil;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setFailedAttempts(0);
      toast({ title: "Welcome back!", description: "You've successfully logged in." });
    } catch (error) {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      if (next >= 5) {
        const until = Date.now() + 60_000;
        setLockoutUntil(until);
        setLockoutSeconds(60);
        toast({ title: "Too many failed attempts", description: "Please wait 60 seconds before trying again.", variant: "destructive" });
      } else {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        toast({ title: "Login failed", description: `${errorMessage} (${next}/5 attempts)`, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin`,
      });
      if (error) throw error;
      toast({ title: "Reset link sent", description: "Check your email for a password reset link." });
      setView("login");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({ title: "Error sending reset link", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please make sure both passwords are identical.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password updated", description: "Your password has been changed. Please log in." });
      await supabase.auth.signOut();
      setView("login");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({ title: "Error updating password", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You've been successfully logged out." });
  };

  const poemMutation = useMutation({
    mutationFn: async (poem: Partial<Poem>) => {
      if (editingPoem) {
        const { error } = await supabase.from("poems").update(poem).eq("id", editingPoem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("poems").insert([poem]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poems"] });
      toast({ title: editingPoem ? "Poem updated" : "Poem created", description: `Successfully ${editingPoem ? "updated" : "created"} the poem.` });
      resetForm();
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("poems").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poems"] });
      toast({ title: "Poem deleted", description: "The poem has been successfully deleted." });
      setDeleteDialogOpen(false);
      setPoemToDelete(null);
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    },
  });

  const handleSubmitPoem = (e: React.FormEvent) => {
    e.preventDefault();
    poemMutation.mutate(poemForm);
  };

  const handleEditPoem = (poem: Poem) => {
    setEditingPoem(poem);
    setPoemForm({ title: poem.title, content: poem.content, theme: poem.theme });
    setShowPoemForm(true);
  };

  const handleDeletePoem = (id: string) => {
    setPoemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (poemToDelete) deleteMutation.mutate(poemToDelete);
  };

  const resetForm = () => {
    setPoemForm({ title: "", content: "", theme: "" });
    setEditingPoem(null);
    setShowPoemForm(false);
  };

  if (!user || view === "reset-password") {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} className="w-full max-w-md">
          <Card>
            {view === "login" && (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-center">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || isLockedOut}>
                      {isLockedOut
                        ? `Too many attempts — try again in ${lockoutSeconds}s`
                        : isLoading
                        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in...</>
                        : <><LogIn className="mr-2 h-4 w-4" />Login</>}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setView("forgot-password")}
                      className="w-full text-sm text-muted-foreground hover:text-primary transition-colors text-center"
                    >
                      Forgot your password?
                    </button>
                  </form>
                </CardContent>
              </>
            )}

            {view === "forgot-password" && (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-center">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Enter your email and we'll send you a reset link.
                  </p>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading
                        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                        : <><Mail className="mr-2 h-4 w-4" />Send Reset Link</>}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="w-full text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <ArrowLeft className="h-3 w-3" />Back to login
                    </button>
                  </form>
                </CardContent>
              </>
            )}

            {view === "reset-password" && (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-center">Set New Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading
                        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</>
                        : <><KeyRound className="mr-2 h-4 w-4" />Update Password</>}
                    </Button>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Total Poems</p><p className="text-3xl font-bold">{poems.length}</p></div><Plus className="h-8 w-8 text-primary" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Contact Messages</p><p className="text-3xl font-bold">{contacts.length}</p></div><Mail className="h-8 w-8 text-primary" /></div></CardContent></Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-playfair text-2xl">Manage Poems</CardTitle>
              <Button onClick={() => setShowPoemForm(!showPoemForm)} variant={showPoemForm ? "outline" : "default"}>
                {showPoemForm ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add New Poem</>}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showPoemForm && (
              <form onSubmit={handleSubmitPoem} className="space-y-4 mb-8 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={poemForm.title} onChange={(e) => setPoemForm({ ...poemForm, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={poemForm.theme} onValueChange={(value) => setPoemForm({ ...poemForm, theme: value })}>
                    <SelectTrigger><SelectValue placeholder="Select a theme" /></SelectTrigger>
                    <SelectContent>{themes.map((theme) => (<SelectItem key={theme} value={theme}>{theme}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" value={poemForm.content} onChange={(e) => setPoemForm({ ...poemForm, content: e.target.value })} rows={10} required />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={poemMutation.isPending}>
                    {poemMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <>{editingPoem ? "Update Poem" : "Create Poem"}</>}
                  </Button>
                  {editingPoem && <Button type="button" variant="outline" onClick={resetForm}>Cancel Edit</Button>}
                </div>
              </form>
            )}
            {poemsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="space-y-4">
                {poems.map((poem) => (
                  <div key={poem.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{poem.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{poem.theme}</p>
                        <p className="text-sm line-clamp-3 whitespace-pre-line">{poem.content}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => handleEditPoem(poem)}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeletePoem(poem.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-playfair text-2xl">Contact Messages</CardTitle></CardHeader>
          <CardContent>
            {contactsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact: ContactSubmission) => (
                  <div key={contact.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{contact.name}</h4>
                        <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">{contact.email}</a>
                      </div>
                      <span className="text-xs text-muted-foreground">{contact.submitted_at && new Date(contact.submitted_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{contact.message}</p>
                  </div>
                ))}
                {contacts.length === 0 && <p className="text-center text-muted-foreground py-8">No contact messages yet.</p>}
              </div>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete the poem from the database.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Admin;
