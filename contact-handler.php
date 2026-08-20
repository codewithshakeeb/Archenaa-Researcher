<?php
/**
 * Contact Form Handler — Archenaa J Portfolio
 *
 * Receives POST submissions from both the inline contact form
 * (contact.html) and the sitewide popup modal. Validates, sanitizes,
 * and sends via PHP mail(). Returns JSON for the frontend fetch() handler.
 *
 * Deployment: upload alongside the HTML files on Namecheap shared hosting.
 * No Composer, no SMTP library — uses PHP's native mail().
 */

/* ── Configuration ─────────────────────────────────────────────────
   Change RECIPIENT_EMAIL to the mailbox that should receive messages.
   SENDER_DOMAIN should match the hosted domain (used for the From header).
   ─────────────────────────────────────────────────────────────────── */
define('RECIPIENT_EMAIL', 'saiarchenaastudy@gmail.com');
define('SENDER_DOMAIN',   'archenaa.com'); // Change to match your actual domain

/* ── JSON response helper ──────────────────────────────────────── */
header('Content-Type: application/json; charset=utf-8');

function respond($success, $error = '') {
    echo json_encode([
        'success' => $success,
        'error'   => $error,
    ]);
    exit;
}

/* ── Only accept POST ──────────────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method not allowed.');
}

/* ── Honeypot spam check ───────────────────────────────────────── 
   The "website" field is hidden via CSS and never filled by real users.
   If it has content, this submission is from a bot — silently reject. */
if (!empty($_POST['website'])) {
    // Return fake success so bots don't retry
    respond(true);
}

/* ── Read & trim inputs ────────────────────────────────────────── */
$name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
$email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

/* ── Validation ────────────────────────────────────────────────── */
if ($name === '' || $email === '' || $message === '') {
    respond(false, 'All fields are required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please provide a valid email address.');
}

/* ── Sanitization (header-injection prevention) ────────────────── 
   Strip carriage returns and newlines from name/email so they
   can't be used to inject extra mail headers. */
$name  = str_replace(["\r", "\n"], '', $name);
$email = str_replace(["\r", "\n"], '', $email);

/* ── Compose email ─────────────────────────────────────────────── */
$subject = 'Portfolio Contact: ' . mb_substr($name, 0, 60);

$body  = "New message from the Archenaa J portfolio website.\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n\n";
$body .= "Message:\n";
$body .= "────────────────────────────────────\n";
$body .= $message . "\n";
$body .= "────────────────────────────────────\n";

$headers  = "From: noreply@" . SENDER_DOMAIN . "\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

/* ── Send ──────────────────────────────────────────────────────── */
$sent = @mail(RECIPIENT_EMAIL, $subject, $body, $headers);

if ($sent) {
    respond(true);
} else {
    respond(false, 'Message could not be sent. Please try again later.');
}
