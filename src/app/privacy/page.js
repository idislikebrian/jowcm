import styles from "../page.module.css";

export const metadata = {
  title: "Privacy Policy — JOWCM",
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div
        className={styles.content}
        style={{ maxWidth: 640, margin: "0 auto", padding: "120px 20px 40px" }}
      >
        <h1>Privacy Policy — Journaling Outdoors Would Cure Me (JOWCM)</h1>

        <p style={{ marginTop: 10 }}>
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <p style={{ marginTop: 20 }}>
          Journaling Outdoors Would Cure Me (JOWCM) respects your privacy.
        </p>

        <h2 style={{ marginTop: 30 }}>Information We Collect</h2>
        <ul>
          <li>Phone number</li>
          <li>Messages you send to the service</li>
          <li>Basic interaction data (timestamps, message activity)</li>
        </ul>

        <h2 style={{ marginTop: 30 }}>How We Use Information</h2>
        <ul>
          <li>To operate the journaling experience</li>
          <li>To send prompts and respond to messages</li>
          <li>To improve the experience over time</li>
        </ul>

        <h2 style={{ marginTop: 30 }}>Data Sharing</h2>
        <p>
          We do not sell, rent, or share your personal information with third parties for marketing purposes.
        </p>

        <h2 style={{ marginTop: 30 }}>Data Storage</h2>
        <p>
          Messages and phone numbers may be stored securely to maintain continuity of the experience.
        </p>

        <h2 style={{ marginTop: 30 }}>User Control</h2>
        <ul>
          <li>You can opt out at any time by replying <strong>STOP</strong></li>
          <li>You can request deletion of your data by contacting us</li>
        </ul>

        <h2 style={{ marginTop: 30 }}>Security</h2>
        <p>We take reasonable steps to protect your information.</p>

        <h2 style={{ marginTop: 30 }}>Contact</h2>
        <p>hello@brian-felix.com</p>

        <p style={{ marginTop: 40, fontSize: 12, opacity: 0.6 }}>
          Message and data rates may apply.
        </p>
      </div>
    </main>
  );
}