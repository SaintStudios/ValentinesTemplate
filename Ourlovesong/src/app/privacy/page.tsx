import { Section } from "@/components/ui/Section";

export default function PrivacyPage() {
    return (
        <Section variant="paper" size="lg" className="min-h-screen pt-32">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="font-serif text-4xl text-brand-espresso mb-8">Privacy Policy</h1>
                <div className="prose prose-stone max-w-none text-brand-mocha">
                    <p className="mb-6 font-semibold">
                        Your privacy is our absolute priority.
                    </p>
                    <p className="mb-6">
                        All uploaded photos, music links, and personal messages are encrypted and used exclusively for the generation of your private 3D date space.
                    </p>
                    <p className="mb-6">
                        We do not sell, share, or distribute your content to any third parties. Only those with the unique generated link can access the space.
                    </p>
                    <p className="mb-6">
                        We implement industry-standard security measures to ensure your romantic moments stay completely private. Your trust is paramount to us.
                    </p>
                </div>
            </div>
        </Section>
    );
}
