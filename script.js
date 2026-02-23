constructor() {
    // Ambil API key dari environment variable
    this.API_KEY = this.getApiKey();
    this.API_URL = 'https://api.groq.com/openai/v1/chat/completions';
    
    // Model yang support gambar di Groq 
    this.MODELS = {
        LLAMA_4_SCOUT: 'meta-llama/llama-4-scout-17b-16e-instruct',
        LLAMA_4_MAVERICK: 'meta-llama/llama-4-maverick-17b-128e-instruct',
        LLAMA_32_VISION: 'llama-3.2-11b-vision-preview',
        LLAVA: 'llava-v1.5-7b-4096-preview'
    };
    
    this.selectedModel = this.MODELS.LLAMA_4_SCOUT;
    
    this.initializeElements();
    this.attachEventListeners();
}

getApiKey() {
    // Coba ambil dari window.env (untuk production di Netlify)
    if (window.env && window.env.GROQ_API_KEY) {
        return window.env.GROQ_API_KEY;
    }
    
    // Fallback untuk development local (jangan commit ini!)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Untuk development, Anda bisa menggunakan prompt atau file .env.local
        console.warn('Running in development mode. Please set GROQ_API_KEY in .env.local');
        return prompt('Masukkan Groq API Key Anda:') || 'dummy-key';
    }
    
    // Jika tidak ada API key, tampilkan error
    alert('GROQ_API_KEY tidak ditemukan. Silakan set environment variable di Netlify.');
    throw new Error('GROQ_API_KEY not found');
}
