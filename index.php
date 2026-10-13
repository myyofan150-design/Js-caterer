<?php
/**
 * JS CATERER — Hostinger Production Entry Point
 * Compatible with Hostinger PHP / HTML Web Hosting Plans
 */
if (file_exists(__DIR__ . '/index.html')) {
    include_once __DIR__ . '/index.html';
} else {
    echo "<h1>JS Caterer</h1><p>Website loaded successfully.</p>";
}
?>
