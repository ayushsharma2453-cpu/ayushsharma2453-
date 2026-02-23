document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) return; // safety check

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Collect form data
        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value.trim()
        };

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("https://ayushsharma2453.onrender.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Message sent successfully!");
                form.reset();
            } else {
                alert("❌ " + result.message);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("❌ Server not responding. Make sure backend is running.");
        }
    });

});
document.getElementById("subscribeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (email) {
    alert("Thanks for subscribing!");
    document.getElementById("subscribeForm").reset();
  }
});
