import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GiveProgress() {
  const { id } = useParams(); // sessionID
  const navigate = useNavigate();

  const [stability, setStability] = useState("Stable");
  const [stressLevel, setStressLevel] = useState(3);
  const [depressionLevel, setDepressionLevel] = useState(3);
  const [workPerformance, setWorkPerformance] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [fatigueLevel, setFatigueLevel] = useState(3);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const submitProgress = async () => {
    if (!id) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionID: id,
          stability,
          stressLevel,
          depressionLevel,
          workPerformance,
          energyLevel,
          fatigueLevel,
          note,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate(-1);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderSlider = (label: string, value: number, setValue: (v: number) => void) => (
    <div>
      <p className="font-medium mb-2">
        {label}: <span className="text-primary">{value}</span>/5
      </p>
      <Slider
        value={[value]}
        min={1}
        max={5}
        step={1}
        onValueChange={(v) => setValue(v[0])}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Add Session Progress
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Fill in the patient's session progress
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stability Dropdown */}
          <div>
            <p className="font-medium mb-2">Stability</p>
            <Select value={stability} onValueChange={setStability}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Stability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Stable">Stable</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderSlider("Stress Level", stressLevel, setStressLevel)}
          {renderSlider("Depression Level", depressionLevel, setDepressionLevel)}
          {renderSlider("Work Performance", workPerformance, setWorkPerformance)}
          {renderSlider("Energy Level", energyLevel, setEnergyLevel)}
          {renderSlider("Fatigue Level", fatigueLevel, setFatigueLevel)}

          {/* Note */}
          <div>
            <p className="font-medium mb-2">Note</p>
            <Textarea
              placeholder="Additional observations or notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            disabled={loading}
            onClick={submitProgress}
            className="w-full"
          >
            {loading ? "Submitting..." : "Submit Progress"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
