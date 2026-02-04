import { Section } from "@/components/ui/Section";

export default function RefundsPage() {
    return (
        <Section variant="paper" size="lg" className="min-h-screen pt-32">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="font-serif text-4xl text-brand-espresso mb-8">Refund Policy</h1>
                <div className="prose prose-stone max-w-none text-brand-mocha">
                    <p className="mb-6 font-semibold">
                        Due to the highly personalized and digital nature of Our3DDate spaces, all sales are final.
                    </p>
                    <p className="mb-6">
                        Once your custom 3D environment has been generated and the delivery link has been sent to your email, we cannot offer any refunds, returns, or exchanges.
                    </p>
                    <p className="mb-6">
                        By completing your purchase, you acknowledge and agree that the delivery of the digital service constitutes full performance of the contract.
                    </p>
                    <p className="mb-6">
                        If you encounter technical issues with accessing your space, please contact our support team, and we will work diligently to resolve them.
                    </p>
                </div>
            </div>
        </Section>
    );
}
