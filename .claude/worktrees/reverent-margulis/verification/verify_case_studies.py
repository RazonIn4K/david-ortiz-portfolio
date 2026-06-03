from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_case_studies(page: Page):
    # 1. Navigate to the Case Studies page
    page.goto("http://localhost:3000/case-studies")

    # 2. Wait for the page to load
    expect(page.get_by_role("heading", name="Automation stories built for lean teams")).to_be_visible()

    # 3. Locate a card (article)
    # We'll check the first article
    article = page.locator("article").first
    expect(article).to_be_visible()

    # 4. Hover over the card to trigger hover effects
    article.hover()

    # 5. Take a screenshot of the cards section
    # Locate the container of cards
    cards_section = page.locator("section.py-20")
    cards_section.screenshot(path="verification/case_studies_verification.png")

    print("Screenshot taken at verification/case_studies_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_case_studies(page)
        finally:
            browser.close()
