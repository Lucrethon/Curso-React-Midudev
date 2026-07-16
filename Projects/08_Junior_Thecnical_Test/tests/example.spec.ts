import { test, expect } from '@playwright/test';



const LocalHost = `http://localhost:5173/`
const catPrefixUrlImgae = 'https://cataas.com/'


test('get random cat image and fact', async ({ page }) => {
  await page.goto(LocalHost);

  // Localizadores
  // Expect to get a random fact
  const text =  page.getByTestId('cat-fact');
  // Expect to get a random cat image
  const image =  page.getByRole('img');


  await expect(image).toBeVisible()
  // Expect that the image source begins with the url prefix 

  // Get text content 
  const textContent = await text.textContent();
  // Get img source 
  const imageSrc = await image.getAttribute('src')

  // Expect the text lenght be grater than 0
  await expect(textContent?.length).toBeGreaterThan(0); 
  // Exéct that the image is visible 
  await expect(imageSrc?.startsWith(catPrefixUrlImgae)).toBeTruthy()

});



