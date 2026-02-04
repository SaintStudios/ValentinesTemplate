import { Section } from "@/components/ui/Section";

export default function TermsPage() {
    return (
        <Section variant="paper" size="lg" className="min-h-screen pt-32">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="font-serif text-4xl text-brand-espresso mb-8">Terms of Service</h1>
                <div className="prose prose-stone max-w-none text-brand-mocha">
                    <p className="mb-6">
                        By accessing and using Our3DDate, you agree to be bound by these Terms of Service. Our platform provides a digital service where users can create personalized 3D environments.
                    </p>
                    <p className="mb-6">
                        You represent that you have the right to use any images or music links uploaded. We reserve the right to terminate access for users who violate our terms or attempt to upload inappropriate content.
                    </p>
                    <p className="mb-6">
                        Our service is provided "as is" without warranties of any kind. We strive to ensure the best possible experience, but cannot guarantee uninterrupted availability of the service.
                    </p>
                </div>
            </div>
        </Section>
    );
}
