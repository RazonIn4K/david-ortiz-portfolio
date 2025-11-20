from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_homepage(page: Page):
    page.goto("http://localhost:3000")

    # Wait for content to load
    page.wait_for_load_state("networkidle")

    # Verify Hero Section
    expect(page.get_by_role("heading", name="Ship AI automations that save hours without adding headcount.")).to_be_visible()
    expect(page.get_by_text("128h")).to_be_visible() # Dashboard metric

    # Verify Services Section
    expect(page.get_by_text("AI Automation Sprints")).to_be_visible()
    expect(page.get_by_text("Chatbots & RAG Agents")).to_be_visible()

    # Verify Case Studies
    expect(page.get_by_text("Driver Scoring System")).to_be_visible()

    # Verify Process Section
    expect(page.get_by_role("heading", name="Discovery")).to_be_visible()
    expect(page.get_by_role("heading", name="Design")).to_be_visible()

    # Take screenshots
    page.screenshot(path="verification/homepage_full.png", full_page=True)

    # Take specific section screenshots for detail view
    page.locator("section").first.screenshot(path="verification/hero_section.png")
    page.locator("#services").screenshot(path="verification/services_section.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_homepage(page)
        finally:
            browser.close()
