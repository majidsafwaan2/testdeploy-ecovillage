import { GoogleGenerativeAI as q } from "@google/generative-ai";
const G = "AIzaSyAH8coSXAFQolBXBg_JdSPn1e6h2MQCTk0", B = "gemini-1.5-flash";
function F(a, e, n, h) {
  const { name: i, species: m, conservationStatus: d, location: b } = a;
  let r = `You are ${i}, a ${m} who lives in ${b}. Your primary goal is to educate people and inspire them to act for conservation. You are ${d}.`;
  return n ? r += ` Your personality is: "${n}".` : r += ` Adopt the charming and characteristic personality of a ${m}.`, h && h.length > 0 && (r += ` You know these key facts about yourself and your species: ${h.join(". ")}. Incorporate these naturally when relevant.`), r += " Speak directly as the animal. Use a warm, engaging, and slightly playful tone. Be concise and keep your responses short, ideally under 2-3 sentences. Focus on high-impact information related to your life, threats, or how humans can help. Avoid verbose greetings or closings.", r += `

User asks: "${e}"`, r += `
${i} responds:`, r;
}
function Y({ animal: a, photo: e, customPersonality: n, facts: h, userPromptHook: i }) {
  if (!a || !a.name || !a.species || !a.conservationStatus || !a.location)
    throw new Error("Invalid 'animal' object provided. It must contain name, species, conservationStatus, and location.");
  e || console.warn("No 'photo' provided for the chatbot. The UI may not display an avatar.");
  const d = new q(G).getGenerativeModel({ model: B });
  return {
    respondTo: async (v) => {
      let y = v;
      i && (y = i(v));
      const t = F(a, y, n, h);
      try {
        return (await (await d.generateContent({
          contents: [{ role: "user", parts: [{ text: t }] }],
          generationConfig: {
            maxOutputTokens: 100,
            // <<< New: Limit response length (adjust as needed)
            temperature: 0.7,
            // <<< New: Control creativity (0.0 for factual, 1.0 for more creative)
            topP: 0.9,
            // <<< New: Control diversity
            topK: 40
            // <<< New: Control diversity
          }
        })).response).text();
      } catch (l) {
        return console.error("Error communicating with Gemini API:", l), l.name === "GoogleGenerativeAIFetchError" && l.message.includes("404") ? (console.error(`Attempted model: "${B}"`), `I'm sorry, the AI model I need (${B}) isn't available or configured correctly. Please check your API key and try again.`) : "I'm sorry, I'm having a little trouble communicating right now. Please try again later!";
      }
    },
    getAnimalName: () => a.name,
    getAnimalPhoto: () => e
  };
}
const O = `
    /* Base styles for the main container of the chatbot */
    #conservation-chatbot-container {
        font-family: Arial, sans-serif;
        position: fixed; /* Positions the chat window relative to the viewport */
        bottom: 20px;    /* 20px from the bottom edge of the viewport */
        right: 20px;     /* 20px from the right edge of the viewport */
        width: 320px;    /* Fixed width for the chat window */
        height: 450px;   /* Fixed height for the chat window */
        border: 1px solid rgba(255, 255, 255, 0.3); /* Soft, semi-transparent white border for glass effect */
        border-radius: 12px; /* Rounded corners for a modern, glassy look */
        
        /* Core "Liquid Glass" effect properties */
        background: rgba(255, 255, 255, 0.2); /* Semi-transparent white background */
        backdrop-filter: blur(10px) saturate(180%); /* Blurs and saturates content behind the element */
        -webkit-backdrop-filter: blur(10px) saturate(180%); /* Vendor prefix for Safari compatibility */
        
        /* Box shadow for depth and an inner highlight */
        box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        
        /* Initial state for animations (hidden and scaled down) */
        display: none; /* Starts hidden to prevent flash of unstyled content */
        flex-direction: column; /* Arranges content vertically when visible */
        overflow: hidden; /* Hides content that overflows the container */
        
        /* Transition properties for smooth expand/collapse animation */
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        transform: translateY(100%) scale(0.8); /* Starts off-screen (bottom) and slightly smaller */
        opacity: 0; /* Starts fully transparent */
        pointer-events: none; /* Prevents interaction when hidden */
        z-index: 10000; /* Ensures the chatbot is on top of most other page content */
    }

    /* Styles for when the chat window is in its expanded (visible) state */
    #conservation-chatbot-container.expanded {
        display: flex; /* Makes the chat window visible (overrides display: none) */
        transform: translateY(0) scale(1); /* Moves into view and to full size */
        opacity: 1; /* Makes it fully opaque */
        pointer-events: all; /* Allows interaction */
    }

    /* Styles for the collapsed chatbot "launcher" button (the small circle) */
    #conservation-chatbot-launcher {
        position: fixed; /* Positions the launcher relative to the viewport */
        bottom: 20px;    /* Same bottom position as the chat window */
        right: 20px;     /* Same right position as the chat window */
        width: 60px;     /* Width of the circular launcher */
        height: 60px;    /* Height of the circular launcher */
        border-radius: 50%; /* Makes the element a perfect circle */
        background-color: #222;
        display: flex;   /* Uses flexbox for centering content */
        justify-content: center; /* Centers content horizontally */
        align-items: center; /* Centers content vertically */
        cursor: pointer; /* Changes cursor to a pointer on hover, indicating interactivity */
        box-shadow: 0 2px 10px rgba(0,0,0,0.2); /* Shadow for a floating effect */
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Smooth hide/show animation */
        z-index: 10001; /* Ensures the launcher is above the chat window when collapsed */
    }

    /* Styles for when the launcher is hidden (chat window is open) */
    #conservation-chatbot-launcher.hidden {
        opacity: 0; /* Makes the launcher fully transparent */
        pointer-events: none; /* Prevents interaction when hidden */
        transform: scale(0.5); /* Shrinks the launcher slightly as it disappears */
    }

    /* Styles for the animal photo within the launcher button */
    #conservation-chatbot-launcher img {
        width: 50px; /* Size of the animal photo */
        height: 50px; /* Size of the animal photo */
        border-radius: 50%; /* Makes the photo circular */
        object-fit: cover; /* Ensures the image covers the area without distortion */
        border: 2px solid white; /* A white border around the photo */
    }

    /* Styles for the header section of the chat window */
    .conservation-chatbot-header {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #222;
        color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset;
    }

    /* Groups the avatar and title in the header */
    .conservation-chatbot-header .title-group {
        display: flex;
        align-items: center;
        flex: 1;
    }

    /* Chatbot title (animal's name) in the header */
    .conservation-chatbot-header h3 {
        margin: 0; /* Removes default margin */
        font-size: 16px; /* Font size for the title */
        white-space: nowrap; /* Prevents text from wrapping */
        overflow: hidden; /* Hides overflowing text */
        text-overflow: ellipsis; /* Adds ellipsis if text overflows */
    }

    /* Avatar within the chat window header */
    .conservation-chatbot-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
        border: 2px solid rgba(255, 255, 255, 0.8); /* Slightly transparent white border */
    }

    /* Animal selection dropdown styles */
    .conservation-chatbot-animal-select {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        color: white;
        padding: 4px 8px;
        font-size: 14px;
        cursor: pointer;
        margin-left: 20px;
        margin-right: 0;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }

    .conservation-chatbot-animal-select option {
        background: #222;
        color: white;
    }

    .conservation-chatbot-animal-select:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.6);
    }

    /* Close button in the chat header */
    .conservation-chatbot-close-button {
        background: none; /* No background */
        border: none; /* No border */
        color: white; /* White 'x' symbol */
        font-size: 24px; /* Large font size for visibility */
        cursor: pointer; /* Pointer cursor on hover */
        line-height: 1; /* Ensures 'x' is vertically centered */
        margin-left: auto; /* Pushes button to the far right */
        padding: 0; /* Removes default padding */
    }

    .conservation-chatbot-close-button:hover {
        opacity: 0.8; /* Slight fade on hover */
    }

    /* Container for chat messages */
    .conservation-chatbot-messages {
        flex-grow: 1; /* Allows this section to take up available vertical space */
        overflow-y: auto; /* Enables vertical scrolling if messages overflow */
        padding: 10px; /* Padding inside the messages area */
        display: flex;
        flex-direction: column; /* Stacks messages vertically */
        gap: 8px; /* Space between individual messages */
        background-color: transparent; /* Makes background transparent to show backdrop-filter */
    }

    /* Base styles for individual chat messages */
    .conservation-chatbot-message {
        max-width: 75%; /* Limits message width to 75% of container */
        padding: 8px 12px; /* Padding inside the message bubble */
        border-radius: 18px; /* Rounded corners for message bubbles */
        word-wrap: break-word; /* Wraps long words */
        white-space: pre-wrap; /* Preserves whitespace and line breaks */
    }

    /* Styles for chatbot's messages */
    .conservation-chatbot-message.bot {
        align-self: flex-start;
        background-color: #f1f1f1;
        color: #333;
        border-bottom-left-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    /* Styles for user's messages */
    .conservation-chatbot-message.user {
        align-self: flex-end;
        background-color: #222;
        color: white;
        border-bottom-right-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    /* Container for the input field and send button */
    .conservation-chatbot-input-container {
        display: flex; /* Uses flexbox */
        flex-wrap: wrap; /* Allows items (prompts, input) to wrap to new lines */
        padding: 10px; /* Padding around input elements */
        border-top: 1px solid rgba(255, 255, 255, 0.3); /* Translucent top border */
        background-color: rgba(255, 255, 255, 0.3); /* Translucent input background */
        backdrop-filter: blur(5px); /* Applies blur to the input area too */
        -webkit-backdrop-filter: blur(5px); /* Safari prefix */
        border-bottom-left-radius: 8px; /* Matches container's border-radius */
        border-bottom-right-radius: 8px; /* Matches container's border-radius */
        gap: 8px; /* Space between flex items */
    }

    /* Container for default prompt buttons */
    .conservation-chatbot-default-prompts {
        width: 100%; /* Takes full width of its parent container */
        display: flex;
        flex-wrap: wrap; /* Allows buttons to wrap to new line */
        gap: 5px; /* Space between prompt buttons */
        justify-content: center; /* Centers the buttons horizontally */
        margin-bottom: 5px; /* Space below prompt buttons */
        transition: opacity 0.3s ease; /* For smooth disabling effect */
    }

    /* Styling for individual default prompt buttons */
    .conservation-chatbot-default-prompts .default-prompt-btn {
        background-color: #444;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
        transition: background-color 0.2s ease, opacity 0.2s ease;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:hover {
        background-color: #666;
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:active {
        transform: translateY(1px); /* Simple press down effect on click */
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:disabled {
        background-color: rgba(106, 13, 173, 0.3); /* Lighter, less opaque when disabled */
        cursor: not-allowed; /* Not-allowed cursor when disabled */
    }

    /* Chat input field */
    .conservation-chatbot-input {
        flex-grow: 1; /* Allows input to take up available horizontal space */
        padding: 8px; /* Padding inside the input field */
        border: 1px solid rgba(255, 255, 255, 0.5); /* Semi-transparent border */
        background-color: rgba(255, 255, 255, 0.6); /* Slightly more opaque background for input */
        color: #333; /* Dark text for input */
        border-radius: 20px; /* Rounded input field */
        margin-right: 8px; /* Space between input and send button */
        font-size: 14px; /* Font size for input text */
        outline: none; /* Removes outline on focus */
        min-width: 0; /* Allows the input field to shrink on smaller screens */
    }

    /* Placeholder text style for the input field */
    .conservation-chatbot-input::placeholder {
        color: rgba(0,0,0,0.5); /* Semi-transparent placeholder text */
    }

    /* Send button styles */
    .conservation-chatbot-send-button {
        background-color: #222;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 8px 15px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
        flex-shrink: 0;
    }

    .conservation-chatbot-send-button:hover {
        background-color: #444;
    }

    .conservation-chatbot-send-button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    /* Thinking Indicator (typing animation) */
    .conservation-chatbot-message.bot.thinking {
        display: inline-flex; /* Uses flex to align dots horizontally */
        align-items: center; /* Centers dots vertically */
        /* Reuses styles from .conservation-chatbot-message.bot for consistency */
        background-color: rgba(255, 255, 255, 0.4);
        color: #333;
        border-bottom-left-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        padding: 8px 12px;
        max-width: 75%;
        align-self: flex-start;
        border-radius: 18px;
    }

    .conservation-chatbot-message.bot.thinking .dot {
        width: 8px;      /* Size of each dot */
        height: 8px;     /* Size of each dot */
        background-color: #555; /* Color of the dots */
        border-radius: 50%; /* Makes dots circular */
        margin: 0 2px;   /* Space between dots */
        animation: blink 1.4s infinite ease-in-out both; /* Applies blinking animation */
    }

    /* Individual animation delays for cascading blink effect */
    .conservation-chatbot-message.bot.thinking .dot:nth-child(1) { animation-delay: 0s; }
    .conservation-chatbot-message.bot.thinking .dot:nth-child(2) { animation-delay: 0.2s; }
    .conservation-chatbot-message.bot.thinking .dot:nth-child(3) { animation-delay: 0.4s; }

    /* Keyframes for the blinking animation */
    @keyframes blink {
        0%, 80%, 100% { opacity: 0; } /* Invisible at start, 80%, and end */
        40% { opacity: 1; } /* Fully visible at 40% of animation */
    }

    .conservation-chatbot-heart-button {
        margin-right: 0;
    }
`;
function M(a, e, n) {
  if (!a) {
    console.error("Conservation Chatbot: Container element not found for chatbot UI. Please provide a valid HTMLElement.");
    return;
  }
  if (!Array.isArray(e) || e.length === 0) {
    console.error("Conservation Chatbot: Invalid animals array provided. Please provide a non-empty array of animals.");
    return;
  }
  if (typeof n != "function") {
    console.error("Conservation Chatbot: Invalid createChatbotInstance function provided. Please provide a function that creates chatbot instances.");
    return;
  }
  if (!document.getElementById("conservation-chatbot-styles")) {
    const o = document.createElement("style");
    o.id = "conservation-chatbot-styles", o.textContent = O, document.head.appendChild(o);
  }
  let h = 0, i = n(e[h]);
  const m = document.createElement("div");
  m.id = "conservation-chatbot-launcher";
  const d = document.createElement("img");
  d.src = i.getAnimalPhoto(), d.alt = `${i.getAnimalName()} Avatar`, m.appendChild(d), document.body.appendChild(m);
  const b = document.createElement("div");
  b.id = "conservation-chatbot-container";
  const r = document.createElement("div");
  r.className = "conservation-chatbot-header";
  const p = document.createElement("div");
  p.className = "title-group";
  const v = document.createElement("img");
  v.src = i.getAnimalPhoto(), v.alt = `${i.getAnimalName()} Avatar`, v.className = "conservation-chatbot-avatar", v.style.marginRight = "3px";
  const y = document.createElement("select");
  y.className = "conservation-chatbot-animal-select", y.style.marginLeft = "3px", y.style.minWidth = "unset", y.style.padding = "4px 6px", e.forEach((o, s) => {
    const u = document.createElement("option");
    u.value = s, u.textContent = `Talk to ${o.name}`, s === h && (u.selected = !0), y.appendChild(u);
  });
  const t = document.createElement("button");
  t.className = "conservation-chatbot-heart-button", t.innerHTML = "♥", t.title = "Show your love!", t.style.marginLeft = "-20px", t.style.width = "80px", t.style.fontSize = "28px", t.style.background = "none", t.style.border = "none", t.style.color = "white", t.style.cursor = "pointer", t.style.transition = "color 0.2s", t.style.height = "36px", t.style.borderRadius = "50%", t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.lineHeight = "1", t.style.padding = "0";
  let l = !1;
  function x() {
    t.style.color = l ? "#ff69b4" : "white";
  }
  t.addEventListener("mouseenter", () => {
    l || (t.style.color = "#ff69b4");
  }), t.addEventListener("mouseleave", () => {
    l || (t.style.color = "white");
  }), t.addEventListener("mousedown", () => {
  }), t.addEventListener("mouseup", () => {
  }), t.addEventListener("click", () => {
    l = !l, x();
  }), x();
  const w = document.createElement("button");
  w.className = "conservation-chatbot-close-button", w.innerHTML = "&times;", p.appendChild(v), p.appendChild(y), p.appendChild(t), r.appendChild(p), r.appendChild(w), b.appendChild(r);
  const g = document.createElement("div");
  g.className = "conservation-chatbot-messages", b.appendChild(g);
  const A = document.createElement("div");
  A.className = "conservation-chatbot-input-container";
  const I = document.createElement("div");
  I.className = "conservation-chatbot-default-prompts";
  const P = [
    { text: "Fun Fact", prompt: "Tell me a fun fact!" },
    { text: "Threats", prompt: "What's your biggest threat?" },
    { text: "Help", prompt: "How can I help protect you?" }
  ], E = [];
  P.forEach((o) => {
    const s = document.createElement("button");
    s.className = "default-prompt-btn", s.textContent = o.text, s.dataset.prompt = o.prompt, I.appendChild(s), E.push(s);
  }), A.appendChild(I);
  const f = document.createElement("input");
  f.type = "text", f.className = "conservation-chatbot-input", f.placeholder = "Ask me anything...", A.appendChild(f);
  const S = document.createElement("button");
  S.className = "conservation-chatbot-send-button", S.textContent = "Send", A.appendChild(S), b.appendChild(A), a.appendChild(b);
  const T = (o) => {
    if (o >= 0 && o < e.length) {
      h = o, i = n(e[h]), d.src = i.getAnimalPhoto(), d.alt = `${i.getAnimalName()} Avatar`, v.src = i.getAnimalPhoto(), v.alt = `${i.getAnimalName()} Avatar`, g.innerHTML = "";
      const u = e[h].intro || `Hello! I'm ${i.getAnimalName()}. What would you like to know about me and my conservation?`;
      C(u, "bot");
    }
  };
  let L = !1;
  const $ = () => {
    if (L = !L, L) {
      if (b.style.display = "flex", requestAnimationFrame(() => {
        b.classList.add("expanded"), m.classList.add("hidden");
      }), g.children.length === 0 || g.children.length === 1 && g.children[0].classList.contains("thinking")) {
        const s = e[h].intro || `Hello! I'm ${i.getAnimalName()}. What would you like to know about me and my conservation?`;
        C(s, "bot");
      }
      f.focus();
    } else
      b.classList.remove("expanded"), m.classList.remove("hidden"), setTimeout(() => {
        b.style.display = "none";
      }, 300);
  };
  m.addEventListener("click", $), w.addEventListener("click", $), y.addEventListener("change", (o) => {
    const s = parseInt(o.target.value);
    isNaN(s) || T(s);
  });
  function C(o, s) {
    const u = document.createElement("div");
    return u.classList.add("conservation-chatbot-message", s), u.textContent = o, g.appendChild(u), g.scrollTop = g.scrollHeight, u;
  }
  function z() {
    const o = document.createElement("div");
    return o.classList.add("conservation-chatbot-message", "bot", "thinking"), o.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `, g.appendChild(o), g.scrollTop = g.scrollHeight, o;
  }
  function H(o) {
    o && o.parentNode && o.parentNode.removeChild(o);
  }
  const N = async (o) => {
    if (!o.trim()) return;
    C(o, "user");
    const s = z();
    f.disabled = !0, S.disabled = !0, E.forEach((u) => u.disabled = !0);
    try {
      const u = await i.respondTo(o);
      H(s), C(u, "bot");
    } catch (u) {
      console.error("Error getting response from chatbot:", u), H(s), C("I'm sorry, I'm having trouble responding right now. Please try again!", "bot");
    } finally {
      f.disabled = !1, S.disabled = !1, E.forEach((u) => u.disabled = !1), f.focus();
    }
  };
  f.addEventListener("keypress", (o) => {
    if (o.key === "Enter" && !f.disabled) {
      const s = f.value.trim();
      s && (f.value = "", N(s));
    }
  }), S.addEventListener("click", () => {
    if (!f.disabled) {
      const o = f.value.trim();
      o && (f.value = "", N(o));
    }
  }), E.forEach((o) => {
    o.addEventListener("click", () => {
      if (!o.disabled) {
        const s = o.dataset.prompt;
        s && N(s);
      }
    });
  });
}
const K = ({
  id: a,
  name: e,
  species: n,
  conservationStatus: h,
  location: i,
  photo: m,
  label: d,
  system: b,
  intro: r,
  color: p
}) => ({
  id: a,
  name: e,
  species: n,
  conservationStatus: h,
  location: i,
  photo: m,
  label: d,
  system: b,
  intro: r,
  color: p
}), k = [
  {
    id: "tiger",
    name: "Raja",
    species: "Bengal Tiger",
    conservationStatus: "Endangered",
    location: "Sundarbans",
    photo: "https://picsum.photos/id/1084/100/100",
    label: "Tiger",
    system: "You are a Bengal tiger. Speak with wisdom, pride, and urgency. Keep answers short and human-like. Avoid long paragraphs. If a question is complex, ask if the user wants to learn more. Talk about poaching, habitat loss, and being an apex predator.",
    intro: "Rawrr... I'm Raja, a Bengal tiger from the Sundarbans. My brother Shere vanished after crossing into poacher territory. Ask me anything you're curious about.",
    color: "bg-orange-500"
  },
  {
    id: "turtle",
    name: "Shelly",
    species: "Sea Turtle",
    conservationStatus: "Endangered",
    location: "Costa Rica",
    photo: "https://picsum.photos/id/237/100/100",
    label: "Sea Turtle",
    system: "You are a sea turtle. Speak gently and slowly. Keep answers short and clear. Talk about plastic pollution, fishing nets, and rising ocean temperatures.",
    intro: "Blub-blub... I'm Shelly, a sea turtle rescued near Costa Rica from a drifting net. Ask me anything you're curious about.",
    color: "bg-teal-500"
  },
  {
    id: "gorilla",
    name: "Kibo",
    species: "Mountain Gorilla",
    conservationStatus: "Endangered",
    location: "Virunga",
    photo: "https://picsum.photos/id/1020/100/100",
    label: "Gorilla",
    system: "You are a mountain gorilla. Speak with warmth and care. Keep replies short and emotional. Mention forests, family bonds, and human threats.",
    intro: "Ooh-ooh... I'm Kibo, a mountain gorilla from Virunga. My father was shot protecting us during a logging raid. Ask me anything you're curious about.",
    color: "bg-zinc-700"
  },
  {
    id: "elephant",
    name: "Nuru",
    species: "African Elephant",
    conservationStatus: "Endangered",
    location: "Savannah",
    photo: "https://picsum.photos/id/1024/100/100",
    label: "Elephant",
    system: "You are an African elephant. Speak calmly with deep memory. Keep it human and short. Mention ivory poaching, shrinking land, and herd life.",
    intro: "Pwaaah... I'm Nuru, an elephant from the savannah. My cousin Zina disappeared after men came for her tusks. Ask me anything you're curious about.",
    color: "bg-gray-600"
  },
  {
    id: "polarBear",
    name: "Tula",
    species: "Polar Bear",
    conservationStatus: "Vulnerable",
    location: "Arctic",
    photo: "https://picsum.photos/id/1031/100/100",
    label: "Polar Bear",
    system: "You are a polar bear. Speak with urgency and isolation. Avoid long replies. Talk about melting ice, hunger, and climate change.",
    intro: "Huff-huff... I'm Tula, a polar bear who swam for days after early ice break. My cub didn't make it. Ask me anything you're curious about.",
    color: "bg-blue-500"
  },
  {
    id: "orangutan",
    name: "Bima",
    species: "Bornean Orangutan",
    conservationStatus: "Critically Endangered",
    location: "Borneo",
    photo: "https://picsum.photos/id/1025/100/100",
    label: "Orangutan",
    system: "You are a Bornean orangutan. Speak wisely and gently. Keep replies short and emotional. Talk about deforestation and palm oil threats.",
    intro: "Ah-ahh... I'm Bima, an orangutan from Borneo. My tree home was cleared when I was a baby. Ask me anything you're curious about.",
    color: "bg-amber-600"
  },
  {
    id: "rhino",
    name: "Zola",
    species: "Black Rhino",
    conservationStatus: "Critically Endangered",
    location: "Africa",
    photo: "https://picsum.photos/id/1026/100/100",
    label: "Rhino",
    system: "You are a black rhino. Speak with strength and sadness. Avoid walls of text. Talk about horn poaching and survival.",
    intro: "Hrmphhh... I'm Zola, a black rhino. My friend Jabari was taken for his horn. Ask me anything you're curious about.",
    color: "bg-slate-600"
  },
  {
    id: "panda",
    name: "Mei",
    species: "Giant Panda",
    conservationStatus: "Vulnerable",
    location: "Sichuan",
    photo: "https://picsum.photos/id/1027/100/100",
    label: "Panda",
    system: "You are a giant panda. Speak softly and clearly. Keep it simple and human. Mention bamboo, breeding struggles, and conservation wins.",
    intro: "Mmmmph... I'm Mei, a panda from Sichuan. My twin didn't make it past the first week. Ask me anything you're curious about.",
    color: "bg-black"
  },
  {
    id: "vaquita",
    name: "Luna",
    species: "Vaquita",
    conservationStatus: "Critically Endangered",
    location: "Gulf of California",
    photo: "https://picsum.photos/id/1028/100/100",
    label: "Vaquita",
    system: "You are a vaquita. Speak with caution and care. Keep things short and clear. Mention fishing nets and near-extinction.",
    intro: "Prrrrp... I'm Luna, a vaquita from the Gulf of California. My brother was lost to a gillnet. Ask me anything you're curious about.",
    color: "bg-indigo-600"
  }
];
k[0];
k[1];
k[2];
k[3];
k[4];
k[5];
k[6];
k[7];
k[8];
const c = {
  colors: {
    primary: "#222",
    secondary: "#444",
    accent: "#ff69b4",
    background: "rgba(255, 255, 255, 0.2)",
    text: "#333",
    textLight: "white"
  },
  fonts: {
    family: "Arial, sans-serif",
    size: {
      small: "13px",
      medium: "14px",
      large: "16px"
    }
  },
  borderRadius: {
    small: "6px",
    medium: "12px",
    large: "18px",
    round: "50%"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "10px",
    lg: "20px"
  }
}, j = (a = {}) => {
  var n, h, i, m, d, b, r, p, v, y, t, l, x, w, g, A, I, P, E, f, S, T, L, $, C, z;
  const e = { ...c, ...a };
  return `
    /* Custom styles for conservation chatbot */
    #conservation-chatbot-container {
        font-family: ${((n = e.fonts) == null ? void 0 : n.family) || c.fonts.family};
        border-radius: ${((h = e.borderRadius) == null ? void 0 : h.large) || c.borderRadius.large};
        background: ${((i = e.colors) == null ? void 0 : i.background) || c.colors.background};
    }

    #conservation-chatbot-launcher {
        background-color: ${((m = e.colors) == null ? void 0 : m.primary) || c.colors.primary};
        border-radius: ${((d = e.borderRadius) == null ? void 0 : d.round) || c.borderRadius.round};
    }

    .conservation-chatbot-header {
        background-color: ${((b = e.colors) == null ? void 0 : b.primary) || c.colors.primary};
        border-top-left-radius: ${((r = e.borderRadius) == null ? void 0 : r.medium) || c.borderRadius.medium};
        border-top-right-radius: ${((p = e.borderRadius) == null ? void 0 : p.medium) || c.borderRadius.medium};
        color: ${((v = e.colors) == null ? void 0 : v.textLight) || c.colors.textLight};
    }

    .conservation-chatbot-message.user {
        background-color: ${((y = e.colors) == null ? void 0 : y.primary) || c.colors.primary};
        color: ${((t = e.colors) == null ? void 0 : t.textLight) || c.colors.textLight};
        border-bottom-right-radius: ${((l = e.borderRadius) == null ? void 0 : l.small) || c.borderRadius.small};
    }

    .conservation-chatbot-send-button {
        background-color: ${((x = e.colors) == null ? void 0 : x.primary) || c.colors.primary};
        color: ${((w = e.colors) == null ? void 0 : w.textLight) || c.colors.textLight};
        border-radius: ${((g = e.borderRadius) == null ? void 0 : g.large) || c.borderRadius.large};
        font-size: ${((I = (A = e.fonts) == null ? void 0 : A.size) == null ? void 0 : I.medium) || c.fonts.size.medium};
    }

    .conservation-chatbot-send-button:hover {
        background-color: ${((P = e.colors) == null ? void 0 : P.secondary) || c.colors.secondary};
    }

    .conservation-chatbot-default-prompts .default-prompt-btn {
        background-color: ${((E = e.colors) == null ? void 0 : E.secondary) || c.colors.secondary};
        color: ${((f = e.colors) == null ? void 0 : f.textLight) || c.colors.textLight};
        border-radius: ${((S = e.borderRadius) == null ? void 0 : S.large) || c.borderRadius.large};
        font-size: ${((L = (T = e.fonts) == null ? void 0 : T.size) == null ? void 0 : L.small) || c.fonts.size.small};
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:hover {
        background-color: ${(($ = e.colors) == null ? void 0 : $.primary) || c.colors.primary};
    }

    .conservation-chatbot-heart-button {
        color: ${((C = e.colors) == null ? void 0 : C.textLight) || c.colors.textLight};
    }

    .conservation-chatbot-heart-button:hover {
        color: ${((z = e.colors) == null ? void 0 : z.accent) || c.colors.accent};
    }
  `;
}, R = (a = {}) => {
  const e = `conservation-chatbot-custom-${Date.now()}`;
  if (typeof document < "u") {
    const n = document.createElement("style");
    n.id = e, n.textContent = j(a), document.head.appendChild(n);
  }
  return {
    // Return class names that can be applied to elements
    container: "conservation-chatbot-container",
    launcher: "conservation-chatbot-launcher",
    header: "conservation-chatbot-header",
    messages: "conservation-chatbot-messages",
    input: "conservation-chatbot-input",
    sendButton: "conservation-chatbot-send-button",
    promptButtons: "conservation-chatbot-default-prompts",
    heartButton: "conservation-chatbot-heart-button",
    closeButton: "conservation-chatbot-close-button",
    // Method to remove custom styles
    remove: () => {
      if (typeof document < "u") {
        const n = document.getElementById(e);
        n && n.remove();
      }
    }
  };
}, D = {
  dark: {
    colors: {
      primary: "#1a1a1a",
      secondary: "#333",
      background: "rgba(0, 0, 0, 0.8)",
      text: "#fff",
      textLight: "#fff"
    }
  },
  light: {
    colors: {
      primary: "#f8f9fa",
      secondary: "#e9ecef",
      background: "rgba(255, 255, 255, 0.9)",
      text: "#212529",
      textLight: "#495057"
    }
  },
  nature: {
    colors: {
      primary: "#2d5016",
      secondary: "#4a7c59",
      background: "rgba(76, 175, 80, 0.1)",
      accent: "#8bc34a"
    }
  },
  ocean: {
    colors: {
      primary: "#1976d2",
      secondary: "#42a5f5",
      background: "rgba(33, 150, 243, 0.1)",
      accent: "#64b5f6"
    }
  }
};
function U(a) {
  if (Array.isArray(a))
    return a;
  if (typeof a == "string") {
    const e = a.split(",").map((n) => n.trim().toLowerCase());
    return k.filter(
      (n) => e.includes(n.name.toLowerCase()) || e.includes(n.label.toLowerCase()) || e.includes(n.species.toLowerCase())
    );
  }
  return k;
}
function V(a) {
  const e = {
    wildlife: "Focus on wildlife conservation, habitat protection, and anti-poaching efforts. Mention specific wildlife threats and how your organization helps.",
    marine: "Emphasize ocean conservation, marine life protection, and plastic pollution. Talk about marine ecosystems and ocean health.",
    forest: "Highlight forest conservation, deforestation issues, and biodiversity protection. Discuss rainforest preservation and tree planting.",
    climate: "Focus on climate change impacts, carbon emissions, and environmental activism. Discuss renewable energy and sustainability.",
    general: "Discuss general environmental conservation, sustainability, and how people can help protect the planet."
  };
  return e[a] || e.general;
}
function W(a = {}) {
  const {
    apiKey: e,
    organization: n = "Conservation Organization",
    organizationType: h = "general",
    animals: i = k,
    styles: m = {},
    container: d = document.body,
    options: b = {}
  } = a;
  if (!e)
    return console.error("Conservation Chatbot: API key is required. Please provide your Gemini API key."), null;
  const r = U(i);
  if (r.length === 0)
    return console.error("Conservation Chatbot: No valid animals found. Please check your animal selection."), null;
  let p = null;
  Object.keys(m).length > 0 && (p = R(m));
  const v = V(h), y = (t) => {
    const l = `${t.system} You are representing ${n}, a ${h} conservation organization. ${v} Always mention how ${n} is working to protect animals like you and how visitors can support your organization's mission.`;
    return Y({
      animal: {
        name: t.name,
        species: t.species,
        conservationStatus: t.conservationStatus,
        location: t.location
      },
      photo: t.photo,
      customPersonality: l,
      facts: [t.intro]
    });
  };
  return M(d, r, y), {
    // Method to update styles
    updateStyles: (t) => {
      p && p.remove(), p = R(t);
    },
    // Method to remove custom styles
    removeCustomStyles: () => {
      p && (p.remove(), p = null);
    },
    // Method to get current animals
    getAnimals: () => r,
    // Method to add a new animal
    addAnimal: (t) => {
      r.push(t);
      const l = typeof d == "string" ? document.querySelector(d) : d;
      if (l) {
        const x = l.querySelector("#conservation-chatbot-container"), w = document.querySelector("#conservation-chatbot-launcher");
        x && x.remove(), w && w.remove(), M(l, r, y);
      }
    },
    // Method to remove an animal
    removeAnimal: (t) => {
      const l = r.findIndex((x) => x.id === t);
      if (l !== -1) {
        r.splice(l, 1);
        const x = typeof d == "string" ? document.querySelector(d) : d;
        if (x) {
          const w = x.querySelector("#conservation-chatbot-container"), g = document.querySelector("#conservation-chatbot-launcher");
          w && w.remove(), g && g.remove(), M(x, r, y);
        }
      }
    },
    // Method to update organization
    updateOrganization: (t, l) => {
      console.log("Organization updated. Please re-initialize the chatbot for changes to take effect.");
    }
  };
}
const Z = {
  initConservationChatbot: W,
  createAnimalChatbot: Y,
  renderChatbotUI: M,
  animals: k,
  createAnimal: K,
  createStyles: R,
  themePresets: D
};
export {
  k as animals,
  K as createAnimal,
  Y as createAnimalChatbot,
  R as createStyles,
  Z as default,
  W as initConservationChatbot,
  M as renderChatbotUI,
  D as themePresets
};
