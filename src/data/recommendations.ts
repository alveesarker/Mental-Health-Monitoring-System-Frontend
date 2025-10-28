import { BookOpen, Brain, Heart, Moon, Sparkles } from "lucide-react";

export interface Recommendation {
    id: string;
    icon: typeof Brain;
    title: string;
    description: string;
    fullDescription: string;
    colorClass: string;
}

export const recommendations: Recommendation[] = [
    {
        id: "meditation",
        icon: Brain,
        title: "Try a 10-minute Meditation",
        description: "Based on your moderate stress level",
        fullDescription: "Meditation is a powerful tool for reducing stress and anxiety. This 10-minute guided meditation will help you focus on your breath, clear your mind, and find inner peace. Regular meditation practice has been shown to lower cortisol levels, improve focus, and enhance emotional well-being. Start with just 10 minutes a day and gradually build up your practice for maximum benefits.",
        colorClass: "bg-[hsl(var(--wellness-blue))]",
    },
    {
        id: "sleep",
        icon: Moon,
        title: "Review Sleep Hygiene Tips",
        description: "Optimize your 7.5 hours of sleep",
        fullDescription: "Quality sleep is essential for physical and mental health. These evidence-based sleep hygiene tips will help you maximize the restorative benefits of your sleep. Learn about optimal room temperature, the importance of consistent sleep schedules, reducing blue light exposure before bed, and creating a relaxing bedtime routine. Better sleep leads to improved mood, cognitive function, and stress resilience.",
        colorClass: "bg-[hsl(var(--wellness-purple))]",
    },
    {
        id: "journaling-1",
        icon: BookOpen,
        title: "Journal Your Stressors",
        description: "Reflect on what's causing stress",
        fullDescription: "Journaling is a therapeutic practice that helps you process emotions and identify stress triggers. By writing down your thoughts and concerns, you gain clarity and perspective on challenging situations. This practice can reveal patterns in your stress responses and help you develop healthier coping strategies. Studies show that expressive writing can reduce anxiety and improve mental health outcomes.",
        colorClass: "bg-[hsl(var(--wellness-mint))]",
    },
    {
        id: "gratitude",
        icon: Heart,
        title: "Practice Gratitude Daily",
        description: "Boost your mood with positive reflection",
        fullDescription: "Gratitude practice has been scientifically proven to increase happiness and reduce depression. By focusing on the positive aspects of your life, even during challenging times, you can shift your mindset and build resilience. Take a few minutes each day to write down three things you're grateful for. This simple practice rewires your brain to notice and appreciate the good in your life.",
        colorClass: "bg-[hsl(var(--wellness-blue))]",
    },
    {
        id: "mindfulness",
        icon: Sparkles,
        title: "Mindfulness Exercises",
        description: "Stay present in the moment",
        fullDescription: "Mindfulness is the practice of being fully present and engaged in the current moment. These exercises will help you develop awareness of your thoughts, feelings, and sensations without judgment. Regular mindfulness practice can reduce rumination, improve emotional regulation, and enhance overall well-being. Learn techniques like body scans, mindful breathing, and present-moment awareness.",
        colorClass: "bg-[hsl(var(--wellness-purple))]",
    },
    {
        id: "journaling-2",
        icon: BookOpen,
        title: "Evening Reflection Journal",
        description: "End your day with intention",
        fullDescription: "Evening journaling helps you process the day's events and prepare for restful sleep. This practice involves reflecting on your accomplishments, challenges, and lessons learned. By acknowledging both successes and difficulties, you can release tension and gain closure on the day. This ritual promotes better sleep quality and helps you wake up with a clearer, more positive mindset.",
        colorClass: "bg-[hsl(var(--wellness-mint))]",
    },
];