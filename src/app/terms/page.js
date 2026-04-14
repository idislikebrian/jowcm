import styles from "../page.module.css";

export const metadata = {
  title: "Terms & Conditions — JOWCM",
};

export default function TermsPage() {
  return (
    <main className={styles.main}>
      <div
        className={styles.content}
        style={{ maxWidth: 640, margin: "0 auto", padding: "120px 20px 40px" }}
      >
        <h1>Terms & Conditions — JOWCM Messaging Program</h1>

        <p style={{ marginTop: 20 }}>
          <strong>Program Name:</strong> Journaling Outdoors Would Cure Me (JOWCM)
        </p>

        <h2 style={{ marginTop: 30 }}>Description</h2>
        <p>
          JOWCM is an SMS-based interactive journaling experience. Users receive prompts and can reply with personal reflections. Participation is voluntary and user-driven.
        </p>

        <h2 style={{ marginTop: 30 }}>Message Frequency</h2>
        <p>Message frequency varies based on user interaction.</p>

        <h2 style={{ marginTop: 30 }}>Cost</h2>
        <p>Message and data rates may apply depending on your mobile carrier.</p>

        <h2 style={{ marginTop: 30 }}>Opt-Out</h2>
        <p>You can opt out at any time by replying <strong>STOP</strong> to any message.</p>

        <h2 style={{ marginTop: 30 }}>Help</h2>
        <p>For assistance, reply <strong>HELP</strong> at any time.</p>

        <h2 style={{ marginTop: 30 }}>User Consent</h2>
        <p>
          By messaging the JOWCM (Journaling Outdoors Would Cure Me) phone number, you agree to receive conversational text messages related to the journaling experience.
        </p>
        <p>No messages will be sent without prior user initiation.</p>

        <h2 style={{ marginTop: 30 }}>Privacy</h2>
        <p>Your information will be handled in accordance with our Privacy Policy.</p>

        <h2 style={{ marginTop: 30 }}>Liability</h2>
        <p>The service is provided “as is” without warranties of any kind.</p>

        <h2 style={{ marginTop: 30 }}>Contact</h2>
        <p>hello@brian-felix.com</p>
        <p>
          For support, contact:{" "}
          <a href="mailto:hello@brian-felix.com">hello@brian-felix.com</a>
        </p>

        <p style={{ marginTop: 40, fontSize: 12, opacity: 0.6 }}>
          Message and data rates may apply.
        </p>
      </div>
    </main>
  );
}
