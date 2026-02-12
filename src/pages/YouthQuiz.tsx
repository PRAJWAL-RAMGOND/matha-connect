import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Flame,
  Gamepad2,
  Stars,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import heroBanner from "@/assets/hero-banner.jpg";
import templeAmbiance from "@/assets/temple-ambiance.jpg";
import templeBell from "@/assets/temple-bell.jpg";

interface QuizCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  vibe: string;
}

interface QuizQuestion {
  id: string;
  categoryId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const categories: QuizCategory[] = [
  {
    id: "festivals",
    name: "Festivals & Traditions",
    description: "Utsava, seve and sampradaya basics",
    image: templeBell,
    vibe: "Festive vibes",
  },
  {
    id: "guruparampara",
    name: "Guru Parampara",
    description: "Acharyas, lineage and heritage",
    image: templeAmbiance,
    vibe: "Legacy mode",
  },
  {
    id: "scriptures",
    name: "Scriptures & Concepts",
    description: "Core ideas in an easy format",
    image: heroBanner,
    vibe: "Wisdom quest",
  },
];

const questionBank: QuizQuestion[] = [
  {
    id: "f1",
    categoryId: "festivals",
    question: "Which special period is widely observed with devotion to Sri Krishna in many Matha traditions?",
    options: ["Chaturmasya", "Diwali", "Ratha Saptami", "Holi"],
    correctAnswer: 0,
    explanation: "Chaturmasya is a spiritually significant observance period marked by discipline, study, and devotion.",
    difficulty: "Easy",
  },
  {
    id: "f2",
    categoryId: "festivals",
    question: "On Sri Krishna Janmashtami, what is typically emphasized in temples?",
    options: ["Harvest rituals", "Night bhajans and Krishna worship", "Kite festival", "New year fire ritual"],
    correctAnswer: 1,
    explanation: "Janmashtami celebrates the birth of Sri Krishna and is often marked by bhajans and midnight worship.",
    difficulty: "Easy",
  },
  {
    id: "f3",
    categoryId: "festivals",
    question: "What does 'seva' primarily mean in a Matha context?",
    options: ["Competition", "Service offered with devotion", "Fasting only", "A type of instrument"],
    correctAnswer: 1,
    explanation: "Seva is selfless service rendered with humility and devotion.",
    difficulty: "Easy",
  },
  {
    id: "g1",
    categoryId: "guruparampara",
    question: "The term 'Guru Parampara' refers to:",
    options: ["Temple architecture", "A lineage of spiritual teachers", "A festival season", "A script language"],
    correctAnswer: 1,
    explanation: "Guru Parampara means the continuous lineage through which teachings are preserved and transmitted.",
    difficulty: "Easy",
  },
  {
    id: "g2",
    categoryId: "guruparampara",
    question: "Why is learning through a living lineage considered important?",
    options: ["It keeps teachings contextual and authentic", "It reduces the need for study", "It changes core principles yearly", "It avoids all rituals"],
    correctAnswer: 0,
    explanation: "A living lineage helps preserve authenticity while guiding students in proper understanding and practice.",
    difficulty: "Medium",
  },
  {
    id: "g3",
    categoryId: "guruparampara",
    question: "A key value commonly highlighted by great Acharyas is:",
    options: ["Arrogance", "Discipline and humility", "Isolation", "Speed reading only"],
    correctAnswer: 1,
    explanation: "Discipline, humility, and devotion are repeatedly emphasized in traditional spiritual training.",
    difficulty: "Easy",
  },
  {
    id: "s1",
    categoryId: "scriptures",
    question: "In Dvaita Vedanta, the relation between Jiva and Supreme is generally understood as:",
    options: ["Absolute identity", "Distinct yet dependent", "Unrelated", "Only symbolic"],
    correctAnswer: 1,
    explanation: "Dvaita upholds a real distinction where Jiva is dependent on the Supreme.",
    difficulty: "Medium",
  },
  {
    id: "s2",
    categoryId: "scriptures",
    question: "What is a healthy first step for youth beginning scriptural learning?",
    options: ["Memorize advanced debates first", "Ignore guidance and self-interpret everything", "Start with basics under guidance", "Only watch short clips"],
    correctAnswer: 2,
    explanation: "Starting from foundational concepts with guidance creates clarity and confidence.",
    difficulty: "Easy",
  },
  {
    id: "s3",
    categoryId: "scriptures",
    question: "Which habit best supports long-term spiritual learning?",
    options: ["Consistent daily study and reflection", "Last-minute revision once a year", "Only collecting quotes", "Skipping practice"],
    correctAnswer: 0,
    explanation: "Steady daily engagement is more effective than occasional bursts.",
    difficulty: "Medium",
  },
];

const YouthQuiz = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userName, setUserName] = useState("");

  const selectedCategoryData = useMemo(
    () => categories.find((category) => category.id === selectedCategory) ?? null,
    [selectedCategory],
  );

  const questions = useMemo(
    () => questionBank.filter((question) => question.categoryId === selectedCategory),
    [selectedCategory],
  );

  const progress = questions.length ? Math.round(((currentQuestion + 1) / questions.length) * 100) : 0;

  const startQuiz = () => {
    if (!userName.trim() || !selectedCategory) {
      toast({ title: "Please enter your name and choose a quiz track", variant: "destructive" });
      return;
    }

    if (!questions.length) {
      toast({ title: "No questions found for this category", variant: "destructive" });
      return;
    }

    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      return;
    }

    setShowResult(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedCategory("");
    setUserName("");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      <div className="sticky top-0 z-10 border-b border-border/50 bg-gradient-maroon/95 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <button onClick={() => navigate("/explore")} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Youth Quiz Arena</h1>
            <p className="text-xs text-maroon-foreground/75">Play. Learn. Level up your spiritual IQ.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        {!quizStarted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 shadow-temple backdrop-blur-sm">
              <img src={heroBanner} alt="Youth quiz banner" className="absolute inset-0 h-full w-full object-cover opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-r from-maroon/15 via-transparent to-primary/10" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    <Sparkles size={12} />
                    Weekly Youth Challenge
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-card/80 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                    <Gamepad2 size={12} className="text-primary" />
                    Fun Mode
                  </div>
                </div>

                <div className="text-center">
                  <Trophy size={46} className="mx-auto mb-3 text-primary" />
                  <h2 className="font-display text-2xl font-bold text-foreground">Ready for a quiz streak?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Pick a quiz track with visuals and jump into a fast challenge.</p>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Your name *</Label>
                    <Input
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      placeholder="Enter your name"
                      className="rounded-xl bg-background/85"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Choose your challenge track *</Label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {categories.map((category) => {
                        const active = selectedCategory === category.id;

                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => setSelectedCategory(category.id)}
                            className={`overflow-hidden rounded-xl border text-left transition-all ${
                              active
                                ? "border-primary ring-2 ring-primary/30"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="relative h-20">
                              <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
                              <div className="absolute bottom-1.5 left-2 right-2">
                                <p className="text-[11px] font-semibold text-white">{category.name}</p>
                                <p className="text-[10px] text-white/80">{category.vibe}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{selectedCategoryData?.description ?? "Choose one track to continue."}</p>
                  </div>

                  <Button
                    onClick={startQuiz}
                    disabled={!userName.trim() || !selectedCategory}
                    className="w-full rounded-xl bg-gradient-saffron py-6 font-display text-base font-bold text-saffron-foreground"
                  >
                    Start Quiz
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : showResult ? (
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-saffron p-6 text-center shadow-temple">
              {selectedCategoryData ? (
                <img src={selectedCategoryData.image} alt={selectedCategoryData.name} className="absolute inset-0 h-full w-full object-cover opacity-20" />
              ) : null}
              <div className="absolute inset-0 bg-saffron/85" />
              <div className="relative">
                <Award size={60} className="mx-auto mb-3 text-saffron-foreground" />
                <h2 className="font-display text-2xl font-bold text-saffron-foreground">Challenge Complete!</h2>
                <p className="mt-1 text-xs text-saffron-foreground/80">Great effort, {userName}! Keep your streak going.</p>
                <div className="my-4 text-4xl font-bold text-saffron-foreground">
                  {score}/{questions.length}
                </div>
                <p className="text-sm text-saffron-foreground/90">
                  {score === questions.length
                    ? "Perfect score! You’re on fire 🔥"
                    : score >= Math.ceil(questions.length * 0.7)
                      ? "Awesome work! You’ve got strong fundamentals."
                      : "Good attempt! Try again and level up your score."}
                </p>
              </div>
            </div>

            <Button onClick={resetQuiz} className="w-full rounded-xl bg-card py-6 text-foreground">
              Play Another Round
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
              <div className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-temple">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="font-semibold text-primary">Score: {score}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-maroon" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-temple">
                {selectedCategoryData ? (
                  <div className="relative h-28">
                    <img src={selectedCategoryData.image} alt={selectedCategoryData.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                      <div className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold uppercase">
                        <Stars size={12} />
                        {selectedCategoryData.name}
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold uppercase">
                        <Flame size={12} />
                        {questions[currentQuestion].difficulty}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="p-5">
                  <p className="mb-4 font-display text-base font-semibold text-foreground">{questions[currentQuestion].question}</p>

                  <div className="space-y-2.5">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => selectedAnswer === null && handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full rounded-xl border-2 p-3 text-left text-sm transition-all ${
                          selectedAnswer === null
                            ? "border-border bg-background hover:border-primary"
                            : index === questions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-500/10"
                              : index === selectedAnswer
                                ? "border-red-500 bg-red-500/10"
                                : "border-border opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && (
                            <CheckCircle2 size={18} className="flex-shrink-0 text-green-500" />
                          )}
                          {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                            <XCircle size={18} className="flex-shrink-0 text-red-500" />
                          )}
                          <span className="flex-1">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3"
                    >
                      <p className="text-xs text-foreground">{questions[currentQuestion].explanation}</p>
                    </motion.div>
                  )}
                </div>
              </div>

              {selectedAnswer !== null && (
                <Button onClick={nextQuestion} className="w-full rounded-xl bg-gradient-maroon py-6 font-display font-bold text-maroon-foreground">
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
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
