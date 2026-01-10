import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-24 md:py-32">
        <SectionHeader 
          title="Privacy Policy" 
          subtitle="How LexCorp Global Partners handles and protects your confidential data."
          alignment="left"
        />
        <div className="prose prose-slate prose-lg dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At LexCorp Global Partners LLP ("LexCorp", "we", "us", or "our"), we are committed to protecting your privacy and ensuring the confidentiality of your personal information. This policy describes how we collect, use, and share information in the course of our global legal practice.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may collect various types of personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
              <li><strong>Contact Information:</strong> Name, job title, address, telephone number, and email address.</li>
              <li><strong>Business Information:</strong> Data provided in the course of the client relationship or otherwise voluntarily provided by you.</li>
              <li><strong>Regulatory Information:</strong> Data required for "Know Your Client" (KYC) and anti-money laundering (AML) checks.</li>
              <li><strong>Technical Data:</strong> Information from your visits to our website, including IP address and browsing activity.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">3. Use of Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
              <li>To provide legal advice and related services.</li>
              <li>To manage and administer our relationship with you and your business.</li>
              <li>To comply with our legal and regulatory obligations.</li>
              <li>To keep you informed about legal updates, news, and services.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">4. Client Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">
              Confidentiality is a fundamental duty of our firm. We maintain strict physical, electronic, and procedural safeguards to protect your data. Information shared within the attorney-client relationship is subject to legal privilege and will not be disclosed to third parties unless required by law or authorized by you.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">5. GDPR and International Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              For individuals in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). Since LexCorp is a global firm, your data may be transferred to and processed in countries outside the EEA. We ensure that such transfers are protected by appropriate safeguards.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the use of your personal information. To exercise these rights, please contact our Data Protection Officer.
            </p>
          </section>
          <div className="mt-16 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Legal Inquiries</h3>
              <p className="text-muted-foreground">For any questions regarding this policy or your data privacy.</p>
            </div>
            <Button className="rounded-full px-8 gap-2">
              <Mail className="w-4 h-4" /> Contact Legal Department
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}