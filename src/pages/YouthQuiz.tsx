import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, CheckCircle2, XCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface QuizCategory {
  id: string;
  name: string;
  description: string | null;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
  difficulty: string;
}

const YouthQuiz = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/quiz_categories?select=*`, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    if (!userName.trim() || !selectedCategory) {
      toast({ title: "Please enter your name and select a category", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/quiz_questions?category_id=eq.${selectedCategory}&select=*`,
        {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        }
      );
      const data = await response.json();
      setQuestions(data || []);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({ title: "Error loading quiz", variant: "destructive" });
    }
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      saveScore();
      setShowResult(true);
    }
  };

  const saveScore = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/quiz_scores`, {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          user_name: userName,
          user_email: userEmail || null,
          category_id: selectedCategory,
          score: score + (selectedAnswer === questions[currentQuestion].correct_answer ? 1 : 0),
          total_questions: questions.length
        })
      });
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedCategory("");
    setUserName("");
    setUserEmail("");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/explore")} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Youth Quiz</h1>
            <p className="text-xs text-maroon-foreground/70">Test your Siddhanta knowledge</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {!quizStarted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-xl bg-card p-6 shadow-temple text-center">
              <Trophy size={48} className="text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Ready to Test Your Knowledge?</h2>
              <p className="text-sm text-muted-foreground">Answer questions on Dvaita philosophy and scriptures</p>
            </div>

            <div className="rounded-xl bg-card p-4 shadow-temple space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Your Name *</Label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Email (optional)</Label>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Select Category *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div>
                          <p className="font-medium">{cat.name}</p>
                          {cat.description && <p className="text-xs text-muted-foreground">{cat.description}</p>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={startQuiz}
                disabled={!userName.trim() || !selectedCategory}
                className="w-full rounded-xl bg-gradient-saffron py-6 font-display text-base font-bold text-saffron-foreground"
              >
                Start Quiz
              </Button>
            </div>
          </motion.div>
        ) : showResult ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
            <div className="rounded-xl bg-gradient-saffron p-6 shadow-temple text-center">
              <Award size={64} className="text-saffron-foreground mx-auto mb-3" />
              <h2 className="font-display text-2xl font-bold text-saffron-foreground mb-2">Quiz Complete!</h2>
              <div className="text-4xl font-bold text-saffron-foreground my-4">
                {score}/{questions.length}
              </div>
              <p className="text-sm text-saffron-foreground/80">
                {score === questions.length
                  ? "Perfect score! Excellent knowledge!"
                  : score >= questions.length * 0.7
                    ? "Great job! Keep learning!"
                    : "Keep practicing to improve!"}
              </p>
            </div>

            <Button onClick={resetQuiz} className="w-full rounded-xl bg-card py-6">
              Take Another Quiz
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="font-semibold text-primary">Score: {score}</span>
              </div>

              <div className="rounded-xl bg-card p-4 shadow-temple">
                <p className="font-display text-base font-semibold text-foreground mb-4">
                  {questions[currentQuestion].question}
                </p>

                <div className="space-y-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full rounded-xl border-2 p-3 text-left text-sm transition-all ${
                        selectedAnswer === null
                          ? "border-border hover:border-primary"
                          : index === questions[currentQuestion].correct_answer
                            ? "border-green-500 bg-green-500/10"
                            : index === selectedAnswer
                              ? "border-red-500 bg-red-500/10"
                              : "border-border opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedAnswer !== null && index === questions[currentQuestion].correct_answer && (
                          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                        )}
                        {selectedAnswer === index && index !== questions[currentQuestion].correct_answer && (
                          <XCircle size={18} className="text-red-500 flex-shrink-0" />
                        )}
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedAnswer !== null && questions[currentQuestion].explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-secondary/50 p-3"
                  >
                    <p className="text-xs text-foreground">{questions[currentQuestion].explanation}</p>
                  </motion.div>
                )}
              </div>

              {selectedAnswer !== null && (
                <Button onClick={nextQuestion} className="w-full rounded-xl bg-gradient-saffron py-6 font-display font-bold text-saffron-foreground">
                  {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default YouthQuiz;
