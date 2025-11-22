import os
from playwright.sync_api import sync_playwright, expect

def verify_chat_styling():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page where the chat component is located
        # Assuming it's on the homepage based on AIAssistant being a component likely used there
        try:
            page.goto("http://localhost:3000", timeout=60000)
        except Exception as e:
            print(f"Error navigating to page: {e}")
            browser.close()
            return

        # Wait for the chat component to be visible
        # The new component has "AI Concierge" text
        try:
            expect(page.get_by_text("AI Concierge")).to_be_visible(timeout=10000)
            print("AI Concierge text found.")
        except Exception as e:
            print(f"Error finding AI Concierge: {e}")
            page.screenshot(path="verification/error_screenshot.png")
            browser.close()
            return

        # Scroll to the chat section using a more specific selector
        # We know it contains "AI Concierge"
        chat_section = page.locator("section").filter(has_text="AI Concierge").first
        chat_section.scroll_into_view_if_needed()

        # Type a message to see the user bubble styling
        input_field = page.get_by_placeholder("Ask about automations, pricing, onboarding...")
        input_field.fill("Hello, how are you?")

        # Click send
        send_button = page.get_by_label("Send message")
        send_button.click()

        # Wait for user message to appear
        expect(page.get_by_text("Hello, how are you?")).to_be_visible()

        # Take a screenshot of the chat component
        if not os.path.exists("verification"):
            os.makedirs("verification")

        page.screenshot(path="verification/chat_component.png", full_page=True)
        print("Screenshot saved to verification/chat_component.png")

        browser.close()

if __name__ == "__main__":
    verify_chat_styling()
