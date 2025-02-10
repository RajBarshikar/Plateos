// src/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyB56D3KBAf--kmQHx5_4ROaoiDRevJbU4s');

export const analyzeFood = async (foodDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `As a nutritionist, analyze this food and provide nutritional information for: ${foodDescription}
    
    Respond ONLY with a valid JSON object in this exact format (numbers only, no text):
    {
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "fiber": number
    }

    Example response:
    {
      "calories": 240,
      "protein": 8,
      "carbs": 46,
      "fats": 4,
      "fiber": 3
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw Gemini response:', text); // Debug log

    // Clean the response text to ensure we have valid JSON
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const parsedData = JSON.parse(cleanedText);
      console.log('Parsed nutrition data:', parsedData); // Debug log
      return parsedData;
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      console.error('Cleaned text was:', cleanedText);
      throw new Error('Invalid response format from Gemini');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};