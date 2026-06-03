import os
from playwright.sync_api import sync_playwright

def verify_design():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Base URL
        base_url = "http://localhost:3000"

        try:
            # 1. Verify Case Studies Page
            print("Verifying Case Studies Page...")
            page.goto(f"{base_url}/case-studies")
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/case_studies_page.png", full_page=True)

            # 2. Verify Work With Me Page (Service Cards Hover)
            print("Verifying Work With Me Page...")
            page.goto(f"{base_url}/work-with-me")
            page.wait_for_load_state("networkidle")

            # Scroll to services
            services_header = page.get_by_text("How we automate your operations")
            services_header.scroll_into_view_if_needed()

            # Hover over first service card
            first_service = page.locator(".group").first
            first_service.hover()
            page.wait_for_timeout(500) # Wait for transition

            page.screenshot(path="verification/work_with_me_hover.png")

            # 3. Verify Homepage Projects Section (Hover)
            print("Verifying Homepage Projects Section...")
            page.goto(base_url)
            page.wait_for_load_state("networkidle")

            # Scroll to projects
            projects_header = page.get_by_text("Real results from real automations")
            projects_header.scroll_into_view_if_needed()

            # Hover over first project card (assuming it has .group class from CaseStudiesSection)
            # We need to be careful to select the right one.
            # The CaseStudiesSection uses .group on article
            first_project = page.locator("article.group").first
            first_project.hover()
            page.wait_for_timeout(500)

            page.screenshot(path="verification/homepage_projects_hover.png")

            print("Screenshots captured successfully.")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    verify_design()
