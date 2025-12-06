from playwright.sync_api import sync_playwright

def verify_preview_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000/preview")
            # Wait for text that actually exists
            page.wait_for_selector("text=David Ortiz", timeout=5000)
            page.screenshot(path="verification/preview_page.png")
            print("Screenshot captured successfully.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_preview_page()
