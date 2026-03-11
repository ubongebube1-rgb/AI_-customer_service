import { 
  Brain, 
  Users, 
  DollarSign, 
  Wrench, 
  UserCheck, 
  ArrowRight, 
  ArrowDown,
  RotateCcw,
  Sparkles,
  Network
} from "lucide-react";
import { AIModuleCard } from "@/components/AIModuleCard";
import { ChatDemo } from "@/components/ChatDemo";
import { ProcessingLog } from "@/components/ProcessingLog";
import { ConnectionDot } from "@/components/ArchitectureFlow";
import { useAIOrchestrator } from "@/hooks/useAIOrchestrator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
    messages,
    logEntries,
    isProcessing,
    currentStep,
    moduleStatus,
    processMessage,
    reset,
  } = useAIOrchestrator();

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Network className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            AI Orchestrator
          </h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
            Supervisor-Worker Model
          </span>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A scalable AI architecture for intelligent customer service routing. Messages flow through 
          Front-Line AI → Supervisor AI → Specialized Sub-AI Workers.
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Architecture Visualization */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              System Architecture
            </h2>
            <Button variant="outline" size="sm" onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset Demo
            </Button>
          </div>

          {/* Architecture Grid */}
          <div className="grid gap-4">
            {/* Layer 1: Front-Line */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <AIModuleCard
                  title="Front-Line AI"
                  description="Primary customer interface. Receives and delivers messages."
                  icon={Users}
                  variant="front-line"
                  status={moduleStatus["front-line"]}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center items-center gap-2 py-2">
              <ConnectionDot active={moduleStatus["front-line"] === "processing"} variant="front-line" />
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
              <ConnectionDot active={moduleStatus.supervisor === "processing"} variant="supervisor" />
            </div>

            {/* Layer 2: Supervisor */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <AIModuleCard
                  title="Supervisor AI"
                  description="Central coordinator. Analyzes messages, routes to specialists, and verifies responses."
                  icon={Brain}
                  variant="supervisor"
                  status={moduleStatus.supervisor}
                >
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="px-2 py-1.5 rounded bg-billing/10 text-billing text-center">
                      refund, money, bill
                    </div>
                    <div className="px-2 py-1.5 rounded bg-tech-support/10 text-tech-support text-center">
                      error, broken, crash
                    </div>
                    <div className="px-2 py-1.5 rounded bg-human-review/10 text-human-review text-center">
                      unclear → review
                    </div>
                  </div>
                </AIModuleCard>
              </div>
            </div>

            {/* Connection Lines to Sub-AIs */}
            <div className="flex justify-center items-center gap-4 py-2">
              <div className="flex items-center gap-1">
                <ConnectionDot active={moduleStatus.billing === "processing"} variant="billing" />
                <ArrowDown className="h-4 w-4 text-billing/50 -rotate-45" />
              </div>
              <div className="flex items-center gap-1">
                <ConnectionDot active={moduleStatus["tech-support"] === "processing"} variant="tech-support" />
                <ArrowDown className="h-4 w-4 text-tech-support/50" />
              </div>
              <div className="flex items-center gap-1">
                <ConnectionDot active={moduleStatus["human-review"] === "processing"} variant="human-review" />
                <ArrowDown className="h-4 w-4 text-human-review/50 rotate-45" />
              </div>
            </div>

            {/* Layer 3: Sub-AI Workers */}
            <div className="grid md:grid-cols-3 gap-4">
              <AIModuleCard
                title="Billing Sub-AI"
                description="Handles refunds, payments, and financial queries."
                icon={DollarSign}
                variant="billing"
                status={moduleStatus.billing}
              />
              <AIModuleCard
                title="Tech Support Sub-AI"
                description="Addresses technical issues and system problems."
                icon={Wrench}
                variant="tech-support"
                status={moduleStatus["tech-support"]}
              />
              <AIModuleCard
                title="Human Review"
                description="Escalation queue for complex or unclear requests."
                icon={UserCheck}
                variant="human-review"
                status={moduleStatus["human-review"]}
              />
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            Interactive Demo
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <ChatDemo
              messages={messages}
              onMessageSent={processMessage}
              isProcessing={isProcessing}
              currentStep={currentStep}
            />
            <ProcessingLog entries={logEntries} />
          </div>
        </section>

        {/* Info Footer */}
        <footer className="mt-12 pt-8 border-t border-border/50">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Routing Logic</h4>
              <p className="text-muted-foreground">
                Messages are analyzed for keywords: billing terms route to the Billing Sub-AI, 
                technical terms to Tech Support, and ambiguous requests to Human Review.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Scalability</h4>
              <p className="text-muted-foreground">
                Add new Sub-AI workers by extending the routing logic. Each worker can be 
                independently scaled based on request volume.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Verification</h4>
              <p className="text-muted-foreground">
                All responses pass through the Supervisor AI for quality verification before 
                delivery, ensuring consistent customer experience.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
