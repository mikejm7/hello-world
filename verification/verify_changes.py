from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the landing page
        page.goto("http://localhost:3000")

        # Wait for potential animations or load
        page.wait_for_timeout(2000)

        # Step 1: Capture Landing Page (Step 1 of flow)
        page.screenshot(path="verification/step1_landing.png")
        print("Captured Step 1 Landing")

        # Fill Step 1 form to proceed
        page.fill("input[name='given-name']", "Tony")
        page.fill("input[name='family-name']", "Stark")
        page.click("button[type='submit']")

        # Step 2: Details Page
        # Wait for transition
        page.wait_for_timeout(4000)

        # Click YES to proceed to Step 3
        page.locator("button", has_text="YES").click()

        # Step 3: Guest Count
        page.wait_for_timeout(2000)

        # Fill Adults (first number input)
        inputs = page.locator("input[type='number']")
        inputs.nth(0).fill("2")

        # Fill Kids (second number input)
        inputs.nth(1).fill("0")

        page.click("button:has-text('NEXT')")

        # Step 5: Receipt
        # Wait for transition (swinging)
        page.wait_for_timeout(4000)
        page.screenshot(path="verification/step5_receipt.png")
        print("Captured Step 5 Receipt")

        browser.close()

if __name__ == "__main__":
    verify_changes()
