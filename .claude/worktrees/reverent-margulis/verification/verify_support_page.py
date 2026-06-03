from playwright.sync_api import Page, expect, sync_playwright

def verify_support_page(page: Page):
    # Go to the support page
    page.goto("http://localhost:3000/support")
    page.wait_for_load_state("networkidle")

    # Verify the title
    expect(page.get_by_text("SUPPORT THE WORK")).to_be_visible()
    expect(page.get_by_role("heading", name="Fuel my learning journey")).to_be_visible()

    # Verify the cards headers
    expect(page.get_by_role("heading", name="Buy me a coffee")).to_be_visible()
    expect(page.get_by_role("heading", name="Photo Restoration")).to_be_visible()

    # Verify the buttons
    expect(page.get_by_text("Send a tip")).to_be_visible()
    expect(page.get_by_text("Order restoration")).to_be_visible()

    # Screenshot desktop
    page.set_viewport_size({"width": 1280, "height": 800})
    page.screenshot(path="verification/support_desktop.png")

    # Screenshot mobile
    page.set_viewport_size({"width": 375, "height": 800}) # Increased height to capture more
    page.screenshot(path="verification/support_mobile.png")

    # Verify Navbar link
    page.goto("http://localhost:3000")
    page.set_viewport_size({"width": 1280, "height": 800})

    # Check if support link is in navbar
    expect(page.get_by_role("link", name="Support")).to_be_visible()

    # Click it and ensure we go to support page
    page.get_by_role("link", name="Support").click()
    expect(page).to_have_url("http://localhost:3000/support")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_support_page(page)
            print("Verification script passed successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
