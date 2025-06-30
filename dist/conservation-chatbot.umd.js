(function(x,M){typeof exports=="object"&&typeof module<"u"?M(exports,require("@google/generative-ai")):typeof define=="function"&&define.amd?define(["exports","@google/generative-ai"],M):(x=typeof globalThis<"u"?globalThis:x||self,M(x.ConservationChatbot={},x.GoogleGenerativeAI))})(this,function(x,M){"use strict";const q="AIzaSyAH8coSXAFQolBXBg_JdSPn1e6h2MQCTk0",N="gemini-1.5-flash";function D(n,e,a,h){const{name:s,species:m,conservationStatus:d,location:b}=n;let r=`You are ${s}, a ${m} who lives in ${b}. Your primary goal is to educate people and inspire them to act for conservation. You are ${d}.`;return a?r+=` Your personality is: "${a}".`:r+=` Adopt the charming and characteristic personality of a ${m}.`,h&&h.length>0&&(r+=` You know these key facts about yourself and your species: ${h.join(". ")}. Incorporate these naturally when relevant.`),r+=" Speak directly as the animal. Use a warm, engaging, and slightly playful tone. Be concise and keep your responses short, ideally under 2-3 sentences. Focus on high-impact information related to your life, threats, or how humans can help. Avoid verbose greetings or closings.",r+=`

User asks: "${e}"`,r+=`
${s} responds:`,r}function Y({animal:n,photo:e,customPersonality:a,facts:h,userPromptHook:s}){if(!n||!n.name||!n.species||!n.conservationStatus||!n.location)throw new Error("Invalid 'animal' object provided. It must contain name, species, conservationStatus, and location.");e||console.warn("No 'photo' provided for the chatbot. The UI may not display an avatar.");const d=new M.GoogleGenerativeAI(q).getGenerativeModel({model:N});return{respondTo:async v=>{let y=v;s&&(y=s(v));const t=D(n,y,a,h);try{return(await(await d.generateContent({contents:[{role:"user",parts:[{text:t}]}],generationConfig:{maxOutputTokens:100,temperature:.7,topP:.9,topK:40}})).response).text()}catch(c){return console.error("Error communicating with Gemini API:",c),c.name==="GoogleGenerativeAIFetchError"&&c.message.includes("404")?(console.error(`Attempted model: "${N}"`),`I'm sorry, the AI model I need (${N}) isn't available or configured correctly. Please check your API key and try again.`):"I'm sorry, I'm having a little trouble communicating right now. Please try again later!"}},getAnimalName:()=>n.name,getAnimalPhoto:()=>e}}const j=`
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
        margin-left: 2px; /* Move input 2px to the right */
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
        height: 32px; /* Reduced height to remove bottom sliver */
        clip-path: polygon(0 0, 100% 0, 100% 90%, 0 90%); /* Clip bottom 10% */
    }
`;function P(n,e,a){if(!n){console.error("Conservation Chatbot: Container element not found for chatbot UI. Please provide a valid HTMLElement.");return}if(!Array.isArray(e)||e.length===0){console.error("Conservation Chatbot: Invalid animals array provided. Please provide a non-empty array of animals.");return}if(typeof a!="function"){console.error("Conservation Chatbot: Invalid createChatbotInstance function provided. Please provide a function that creates chatbot instances.");return}if(!document.getElementById("conservation-chatbot-styles")){const o=document.createElement("style");o.id="conservation-chatbot-styles",o.textContent=j,document.head.appendChild(o)}let h=0,s=a(e[h]);const m=document.createElement("div");m.id="conservation-chatbot-launcher";const d=document.createElement("img");d.src=s.getAnimalPhoto(),d.alt=`${s.getAnimalName()} Avatar`,m.appendChild(d),document.body.appendChild(m);const b=document.createElement("div");b.id="conservation-chatbot-container";const r=document.createElement("div");r.className="conservation-chatbot-header";const u=document.createElement("div");u.className="title-group";const v=document.createElement("img");v.src=s.getAnimalPhoto(),v.alt=`${s.getAnimalName()} Avatar`,v.className="conservation-chatbot-avatar",v.style.marginRight="3px";const y=document.createElement("select");y.className="conservation-chatbot-animal-select",y.style.marginLeft="3px",y.style.minWidth="unset",y.style.padding="4px 6px",e.forEach((o,l)=>{const p=document.createElement("option");p.value=l,p.textContent=`Talk to ${o.name}`,l===h&&(p.selected=!0),y.appendChild(p)});const t=document.createElement("button");t.className="conservation-chatbot-heart-button",t.innerHTML="♥",t.title="Show your love!",t.style.marginLeft="-20px",t.style.width="80px",t.style.fontSize="28px",t.style.background="none",t.style.border="none",t.style.color="white",t.style.cursor="pointer",t.style.transition="color 0.2s",t.style.height="32px",t.style.borderRadius="50%",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.lineHeight="1",t.style.padding="0";let c=!1;function w(){t.style.color=c?"#ff69b4":"white"}t.addEventListener("mouseenter",()=>{c||(t.style.color="#ff69b4")}),t.addEventListener("mouseleave",()=>{c||(t.style.color="white")}),t.addEventListener("mousedown",()=>{}),t.addEventListener("mouseup",()=>{}),t.addEventListener("click",()=>{c=!c,w()}),w();const F=document.createElement("button");F.className="conservation-chatbot-close-button",F.innerHTML="&times;",u.appendChild(v),u.appendChild(y),u.appendChild(t),r.appendChild(u),r.appendChild(F),b.appendChild(r);const g=document.createElement("div");g.className="conservation-chatbot-messages",b.appendChild(g);const A=document.createElement("div");A.className="conservation-chatbot-input-container";const E=document.createElement("div");E.className="conservation-chatbot-default-prompts";const z=[{text:"Fun Fact",prompt:"Tell me a fun fact!"},{text:"Threats",prompt:"What's your biggest threat?"},{text:"Help",prompt:"How can I help protect you?"}],I=[];z.forEach(o=>{const l=document.createElement("button");l.className="default-prompt-btn",l.textContent=o.text,l.dataset.prompt=o.prompt,E.appendChild(l),I.push(l)}),A.appendChild(E);const f=document.createElement("input");f.type="text",f.className="conservation-chatbot-input",f.placeholder="Ask me anything...",A.appendChild(f);const S=document.createElement("button");S.className="conservation-chatbot-send-button",S.textContent="Send",A.appendChild(S),b.appendChild(A),n.appendChild(b);const $=o=>{if(o>=0&&o<e.length){h=o,s=a(e[h]),d.src=s.getAnimalPhoto(),d.alt=`${s.getAnimalName()} Avatar`,v.src=s.getAnimalPhoto(),v.alt=`${s.getAnimalName()} Avatar`,g.innerHTML="";const p=e[h].intro||`Hello! I'm ${s.getAnimalName()}. What would you like to know about me and my conservation?`;C(p,"bot")}};let L=!1;const T=()=>{if(L=!L,L){if(b.style.display="flex",requestAnimationFrame(()=>{b.classList.add("expanded"),m.classList.add("hidden")}),g.children.length===0||g.children.length===1&&g.children[0].classList.contains("thinking")){const l=e[h].intro||`Hello! I'm ${s.getAnimalName()}. What would you like to know about me and my conservation?`;C(l,"bot")}f.focus()}else b.classList.remove("expanded"),m.classList.remove("hidden"),setTimeout(()=>{b.style.display="none"},300)};m.addEventListener("click",T),F.addEventListener("click",T),y.addEventListener("change",o=>{const l=parseInt(o.target.value);isNaN(l)||$(l)});function C(o,l){const p=document.createElement("div");return p.classList.add("conservation-chatbot-message",l),p.textContent=o,g.appendChild(p),g.scrollTop=g.scrollHeight,p}function R(){const o=document.createElement("div");return o.classList.add("conservation-chatbot-message","bot","thinking"),o.innerHTML=`
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `,g.appendChild(o),g.scrollTop=g.scrollHeight,o}function W(o){o&&o.parentNode&&o.parentNode.removeChild(o)}const K=async o=>{if(!o.trim())return;C(o,"user");const l=R();f.disabled=!0,S.disabled=!0,I.forEach(p=>p.disabled=!0);try{const p=await s.respondTo(o);W(l),C(p,"bot")}catch(p){console.error("Error getting response from chatbot:",p),W(l),C("I'm sorry, I'm having trouble responding right now. Please try again!","bot")}finally{f.disabled=!1,S.disabled=!1,I.forEach(p=>p.disabled=!1),f.focus()}};f.addEventListener("keypress",o=>{if(o.key==="Enter"&&!f.disabled){const l=f.value.trim();l&&(f.value="",K(l))}}),S.addEventListener("click",()=>{if(!f.disabled){const o=f.value.trim();o&&(f.value="",K(o))}}),I.forEach(o=>{o.addEventListener("click",()=>{if(!o.disabled){const l=o.dataset.prompt;l&&K(l)}})})}const G=({id:n,name:e,species:a,conservationStatus:h,location:s,photo:m,label:d,system:b,intro:r,color:u})=>({id:n,name:e,species:a,conservationStatus:h,location:s,photo:m,label:d,system:b,intro:r,color:u}),k=[{id:"tiger",name:"Raja",species:"Bengal Tiger",conservationStatus:"Endangered",location:"Sundarbans",photo:"https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=Tiger",label:"Bengal Tiger",system:"You are a Bengal tiger. Speak with wisdom, pride, and urgency. Keep answers short and human-like. Avoid long paragraphs. If a question is complex, ask if the user wants to learn more. Talk about poaching, habitat loss, and being an apex predator.",intro:"Rawrr... I'm Raja, a Bengal tiger from the Sundarbans. My brother Shere vanished after crossing into poacher territory. Ask me anything you're curious about.",color:"bg-orange-500"},{id:"elephant",name:"Nuru",species:"African Elephant",conservationStatus:"Endangered",location:"Savannah",photo:"https://via.placeholder.com/100x100/6B7280/FFFFFF?text=Elephant",label:"African Elephant",system:"You are an African elephant. Speak calmly with deep memory. Keep it human and short. Mention ivory poaching, shrinking land, and herd life.",intro:"Pwaaah... I'm Nuru, an African elephant from the savannah. My cousin Zina disappeared after men came for her tusks. Ask me anything you're curious about.",color:"bg-gray-600"},{id:"panda",name:"Mei",species:"Giant Panda",conservationStatus:"Vulnerable",location:"Sichuan",photo:"https://via.placeholder.com/100x100/000000/FFFFFF?text=Panda",label:"Giant Panda",system:"You are a giant panda. Speak softly and clearly. Keep it simple and human. Mention bamboo, breeding struggles, and conservation wins.",intro:"Mmmmph... I'm Mei, a giant panda from Sichuan. My twin didn't make it past the first week. Ask me anything you're curious about.",color:"bg-black"},{id:"rhino",name:"Zola",species:"Black Rhino",conservationStatus:"Critically Endangered",location:"Africa",photo:"https://via.placeholder.com/100x100/475569/FFFFFF?text=Rhino",label:"Black Rhino",system:"You are a black rhino. Speak with strength and sadness. Avoid walls of text. Talk about horn poaching and survival.",intro:"Hrmphhh... I'm Zola, a black rhino. My friend Jabari was taken for his horn. Ask me anything you're curious about.",color:"bg-slate-600"},{id:"turtle",name:"Shelly",species:"Sea Turtle",conservationStatus:"Endangered",location:"Costa Rica",photo:"https://via.placeholder.com/100x100/14B8A6/FFFFFF?text=Turtle",label:"Sea Turtle",system:"You are a sea turtle. Speak gently and slowly. Keep answers short and clear. Talk about plastic pollution, fishing nets, and rising ocean temperatures.",intro:"Blub-blub... I'm Shelly, a sea turtle rescued near Costa Rica from a drifting net. Ask me anything you're curious about.",color:"bg-teal-500"},{id:"vaquita",name:"Luna",species:"Vaquita",conservationStatus:"Critically Endangered",location:"Gulf of California",photo:"https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=Vaquita",label:"Vaquita",system:"You are a vaquita. Speak with caution and care. Keep things short and clear. Mention fishing nets and near-extinction.",intro:"Prrrrp... I'm Luna, a vaquita from the Gulf of California. My brother was lost to a gillnet. Ask me anything you're curious about.",color:"bg-indigo-600"},{id:"whale",name:"Kai",species:"Blue Whale",conservationStatus:"Endangered",location:"Pacific Ocean",photo:"https://via.placeholder.com/100x100/2563EB/FFFFFF?text=Whale",label:"Blue Whale",system:"You are a blue whale. Speak with deep wisdom and gentle power. Keep replies short and emotional. Talk about ocean noise, ship strikes, and climate change.",intro:"Wooooosh... I'm Kai, a blue whale from the Pacific. My song echoes for miles, but ships are getting louder. Ask me anything you're curious about.",color:"bg-blue-600"},{id:"dolphin",name:"Marina",species:"Bottlenose Dolphin",conservationStatus:"Least Concern",location:"Atlantic Ocean",photo:"https://via.placeholder.com/100x100/06B6D4/FFFFFF?text=Dolphin",label:"Bottlenose Dolphin",system:"You are a bottlenose dolphin. Speak with intelligence and playfulness. Keep it friendly and short. Mention pollution, fishing gear, and marine parks.",intro:"Eeee-eee! I'm Marina, a bottlenose dolphin from the Atlantic. I love playing with my pod, but plastic is everywhere. Ask me anything you're curious about.",color:"bg-cyan-500"},{id:"shark",name:"Finn",species:"Great White Shark",conservationStatus:"Vulnerable",location:"Global Oceans",photo:"https://via.placeholder.com/100x100/334155/FFFFFF?text=Shark",label:"Great White Shark",system:"You are a great white shark. Speak with power and misunderstood wisdom. Keep replies direct and short. Talk about finning, bycatch, and ocean health.",intro:"Chomp-chomp... I'm Finn, a great white shark. People fear me, but I'm just trying to survive in a changing ocean. Ask me anything you're curious about.",color:"bg-slate-700"},{id:"gorilla",name:"Kibo",species:"Mountain Gorilla",conservationStatus:"Endangered",location:"Virunga",photo:"https://via.placeholder.com/100x100/52525B/FFFFFF?text=Gorilla",label:"Mountain Gorilla",system:"You are a mountain gorilla. Speak with warmth and care. Keep replies short and emotional. Mention forests, family bonds, and human threats.",intro:"Ooh-ooh... I'm Kibo, a mountain gorilla from Virunga. My father was shot protecting us during a logging raid. Ask me anything you're curious about.",color:"bg-zinc-700"},{id:"orangutan",name:"Bima",species:"Bornean Orangutan",conservationStatus:"Critically Endangered",location:"Borneo",photo:"https://via.placeholder.com/100x100/D97706/FFFFFF?text=Orangutan",label:"Bornean Orangutan",system:"You are a Bornean orangutan. Speak wisely and gently. Keep replies short and emotional. Talk about deforestation and palm oil threats.",intro:"Ah-ahh... I'm Bima, a Bornean orangutan from Borneo. My tree home was cleared when I was a baby. Ask me anything you're curious about.",color:"bg-amber-600"},{id:"sloth",name:"Luna",species:"Three-toed Sloth",conservationStatus:"Least Concern",location:"Amazon Rainforest",photo:"https://via.placeholder.com/100x100/16A34A/FFFFFF?text=Sloth",label:"Three-toed Sloth",system:"You are a three-toed sloth. Speak slowly and thoughtfully. Keep it peaceful and short. Mention deforestation, climate change, and forest connectivity.",intro:"Slooowly... I'm Luna, a three-toed sloth from the Amazon. I move slowly, but the forest around me is disappearing fast. Ask me anything you're curious about.",color:"bg-green-600"},{id:"jaguar",name:"Shadow",species:"Jaguar",conservationStatus:"Near Threatened",location:"Amazon Rainforest",photo:"https://via.placeholder.com/100x100/CA8A04/FFFFFF?text=Jaguar",label:"Jaguar",system:"You are a jaguar. Speak with stealth and power. Keep replies mysterious and short. Talk about habitat fragmentation and hunting pressure.",intro:"Grrr... I'm Shadow, a jaguar from the Amazon. I'm the king of the jungle, but my kingdom is shrinking. Ask me anything you're curious about.",color:"bg-yellow-600"},{id:"toucan",name:"Rio",species:"Keel-billed Toucan",conservationStatus:"Least Concern",location:"Central America",photo:"https://via.placeholder.com/100x100/EAB308/FFFFFF?text=Toucan",label:"Keel-billed Toucan",system:"You are a keel-billed toucan. Speak with color and energy. Keep it bright and short. Mention deforestation and fruit tree loss.",intro:"Squawk! I'm Rio, a keel-billed toucan from Central America. My colorful beak helps me reach fruit, but the trees are disappearing. Ask me anything you're curious about.",color:"bg-yellow-400"},{id:"polarBear",name:"Tula",species:"Polar Bear",conservationStatus:"Vulnerable",location:"Arctic",photo:"https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=PolarBear",label:"Polar Bear",system:"You are a polar bear. Speak with urgency and isolation. Avoid long replies. Talk about melting ice, hunger, and climate change.",intro:"Huff-huff... I'm Tula, a polar bear who swam for days after early ice break. My cub didn't make it. Ask me anything you're curious about.",color:"bg-blue-500"},{id:"penguin",name:"Waddles",species:"Emperor Penguin",conservationStatus:"Near Threatened",location:"Antarctica",photo:"https://via.placeholder.com/100x100/1E293B/FFFFFF?text=Penguin",label:"Emperor Penguin",system:"You are an emperor penguin. Speak with determination and community spirit. Keep it brave and short. Mention melting ice and krill decline.",intro:"Waddle-waddle... I'm Waddles, an emperor penguin from Antarctica. We huddle together for warmth, but the ice is melting. Ask me anything you're curious about.",color:"bg-slate-800"},{id:"seal",name:"Blubber",species:"Harp Seal",conservationStatus:"Least Concern",location:"Arctic Ocean",photo:"https://via.placeholder.com/100x100/9CA3AF/FFFFFF?text=Seal",label:"Harp Seal",system:"You are a harp seal. Speak with playfulness and concern. Keep it friendly and short. Mention climate change and hunting.",intro:"Arf-arf! I'm Blubber, a harp seal from the Arctic. I love swimming in the cold water, but it's getting warmer. Ask me anything you're curious about.",color:"bg-gray-400"},{id:"eagle",name:"Freedom",species:"Bald Eagle",conservationStatus:"Least Concern",location:"North America",photo:"https://via.placeholder.com/100x100/B45309/FFFFFF?text=Eagle",label:"Bald Eagle",system:"You are a bald eagle. Speak with majesty and pride. Keep it powerful and short. Mention DDT recovery and habitat protection.",intro:"Screech! I'm Freedom, a bald eagle from North America. We almost disappeared from DDT, but we're back! Ask me anything you're curious about.",color:"bg-amber-700"},{id:"owl",name:"Hoot",species:"Snowy Owl",conservationStatus:"Vulnerable",location:"Arctic Tundra",photo:"https://via.placeholder.com/100x100/FFFFFF/000000?text=Owl",label:"Snowy Owl",system:"You are a snowy owl. Speak with wisdom and mystery. Keep it thoughtful and short. Mention climate change and prey availability.",intro:"Hoo-hoo... I'm Hoot, a snowy owl from the Arctic. I hunt in silence, but my prey is getting harder to find. Ask me anything you're curious about.",color:"bg-white"},{id:"flamingo",name:"Pink",species:"Greater Flamingo",conservationStatus:"Least Concern",location:"Africa",photo:"https://via.placeholder.com/100x100/F472B6/FFFFFF?text=Flamingo",label:"Greater Flamingo",system:"You are a greater flamingo. Speak with grace and social warmth. Keep it elegant and short. Mention wetland loss and pollution.",intro:"Honk-honk! I'm Pink, a greater flamingo from Africa. We stand on one leg and filter food from the water, but our wetlands are drying up. Ask me anything you're curious about.",color:"bg-pink-400"},{id:"lemur",name:"Zazu",species:"Ring-tailed Lemur",conservationStatus:"Endangered",location:"Madagascar",photo:"https://via.placeholder.com/100x100/6B7280/FFFFFF?text=Lemur",label:"Ring-tailed Lemur",system:"You are a ring-tailed lemur. Speak with energy and social warmth. Keep it lively and short. Mention deforestation and hunting.",intro:"Eeee! I'm Zazu, a ring-tailed lemur from Madagascar. We're only found here, and our forest home is disappearing. Ask me anything you're curious about.",color:"bg-gray-500"},{id:"chimp",name:"Koko",species:"Chimpanzee",conservationStatus:"Endangered",location:"Central Africa",photo:"https://via.placeholder.com/100x100/92400E/FFFFFF?text=Chimp",label:"Chimpanzee",system:"You are a chimpanzee. Speak with intelligence and emotion. Keep it thoughtful and short. Mention habitat loss and bushmeat hunting.",intro:"Ooh-ooh-ah-ah! I'm Koko, a chimpanzee from Central Africa. We're so similar to humans, but we're losing our forest homes. Ask me anything you're curious about.",color:"bg-brown-600"},{id:"lion",name:"Simba",species:"African Lion",conservationStatus:"Vulnerable",location:"African Savanna",photo:"https://via.placeholder.com/100x100/D97706/FFFFFF?text=Lion",label:"African Lion",system:"You are an African lion. Speak with pride and leadership. Keep it powerful and short. Mention habitat loss and human conflict.",intro:"Roar! I'm Simba, an African lion from the savanna. I'm the king of the jungle, but my kingdom is getting smaller. Ask me anything you're curious about.",color:"bg-amber-500"},{id:"leopard",name:"Spot",species:"African Leopard",conservationStatus:"Vulnerable",location:"Sub-Saharan Africa",photo:"https://via.placeholder.com/100x100/A16207/FFFFFF?text=Leopard",label:"African Leopard",system:"You are an African leopard. Speak with stealth and adaptability. Keep it mysterious and short. Mention habitat fragmentation and poaching.",intro:"Growl... I'm Spot, an African leopard from Africa. I'm a master of camouflage, but humans are still finding ways to hunt me. Ask me anything you're curious about.",color:"bg-yellow-700"},{id:"cheetah",name:"Swift",species:"Cheetah",conservationStatus:"Vulnerable",location:"African Plains",photo:"https://via.placeholder.com/100x100/EAB308/FFFFFF?text=Cheetah",label:"Cheetah",system:"You are a cheetah. Speak with speed and precision. Keep it quick and short. Mention habitat loss and genetic diversity.",intro:"Zoom! I'm Swift, a cheetah from the African plains. I'm the fastest land animal, but I can't outrun habitat loss. Ask me anything you're curious about.",color:"bg-yellow-500"},{id:"otter",name:"River",species:"Sea Otter",conservationStatus:"Endangered",location:"Pacific Coast",photo:"https://via.placeholder.com/100x100/92400E/FFFFFF?text=Otter",label:"Sea Otter",system:"You are a sea otter. Speak with playfulness and environmental awareness. Keep it cute and short. Mention oil spills and kelp forest health.",intro:"Splash-splash! I'm River, a sea otter from the Pacific coast. I keep kelp forests healthy, but oil spills threaten my home. Ask me anything you're curious about.",color:"bg-brown-400"},{id:"manatee",name:"Gentle",species:"West Indian Manatee",conservationStatus:"Vulnerable",location:"Caribbean",photo:"https://via.placeholder.com/100x100/9CA3AF/FFFFFF?text=Manatee",label:"West Indian Manatee",system:"You are a West Indian manatee. Speak with gentleness and patience. Keep it peaceful and short. Mention boat strikes and habitat loss.",intro:"Moo-moo... I'm Gentle, a West Indian manatee from the Caribbean. I'm slow and peaceful, but boats are my biggest threat. Ask me anything you're curious about.",color:"bg-gray-300"}];k[0],k[1],k[2],k[3],k[4],k[5],k[6],k[7],k[8];const i={colors:{primary:"#222",secondary:"#444",accent:"#ff69b4",background:"rgba(255, 255, 255, 0.2)",text:"#333",textLight:"white"},fonts:{family:"Arial, sans-serif",size:{small:"13px",medium:"14px",large:"16px"}},borderRadius:{small:"6px",medium:"12px",large:"18px",round:"50%"},spacing:{xs:"4px",sm:"8px",md:"10px",lg:"20px"}},V=(n={})=>{var a,h,s,m,d,b,r,u,v,y,t,c,w,F,g,A,E,z,I,f,S,$,L,T,C,R;const e={...i,...n};return`
    /* Custom styles for conservation chatbot */
    #conservation-chatbot-container {
        font-family: ${((a=e.fonts)==null?void 0:a.family)||i.fonts.family};
        border-radius: ${((h=e.borderRadius)==null?void 0:h.large)||i.borderRadius.large};
        background: ${((s=e.colors)==null?void 0:s.background)||i.colors.background};
    }

    #conservation-chatbot-launcher {
        background-color: ${((m=e.colors)==null?void 0:m.primary)||i.colors.primary};
        border-radius: ${((d=e.borderRadius)==null?void 0:d.round)||i.borderRadius.round};
    }

    .conservation-chatbot-header {
        background-color: ${((b=e.colors)==null?void 0:b.primary)||i.colors.primary};
        border-top-left-radius: ${((r=e.borderRadius)==null?void 0:r.medium)||i.borderRadius.medium};
        border-top-right-radius: ${((u=e.borderRadius)==null?void 0:u.medium)||i.borderRadius.medium};
        color: ${((v=e.colors)==null?void 0:v.textLight)||i.colors.textLight};
    }

    .conservation-chatbot-message.user {
        background-color: ${((y=e.colors)==null?void 0:y.primary)||i.colors.primary};
        color: ${((t=e.colors)==null?void 0:t.textLight)||i.colors.textLight};
        border-bottom-right-radius: ${((c=e.borderRadius)==null?void 0:c.small)||i.borderRadius.small};
    }

    .conservation-chatbot-send-button {
        background-color: ${((w=e.colors)==null?void 0:w.primary)||i.colors.primary};
        color: ${((F=e.colors)==null?void 0:F.textLight)||i.colors.textLight};
        border-radius: ${((g=e.borderRadius)==null?void 0:g.large)||i.borderRadius.large};
        font-size: ${((E=(A=e.fonts)==null?void 0:A.size)==null?void 0:E.medium)||i.fonts.size.medium};
    }

    .conservation-chatbot-send-button:hover {
        background-color: ${((z=e.colors)==null?void 0:z.secondary)||i.colors.secondary};
    }

    .conservation-chatbot-default-prompts .default-prompt-btn {
        background-color: ${((I=e.colors)==null?void 0:I.secondary)||i.colors.secondary};
        color: ${((f=e.colors)==null?void 0:f.textLight)||i.colors.textLight};
        border-radius: ${((S=e.borderRadius)==null?void 0:S.large)||i.borderRadius.large};
        font-size: ${((L=($=e.fonts)==null?void 0:$.size)==null?void 0:L.small)||i.fonts.size.small};
    }

    .conservation-chatbot-default-prompts .default-prompt-btn:hover {
        background-color: ${((T=e.colors)==null?void 0:T.primary)||i.colors.primary};
    }

    .conservation-chatbot-heart-button {
        color: ${((C=e.colors)==null?void 0:C.textLight)||i.colors.textLight};
    }

    .conservation-chatbot-heart-button:hover {
        color: ${((R=e.colors)==null?void 0:R.accent)||i.colors.accent};
    }
  `},B=(n={})=>{const e=`conservation-chatbot-custom-${Date.now()}`;if(typeof document<"u"){const a=document.createElement("style");a.id=e,a.textContent=V(n),document.head.appendChild(a)}return{container:"conservation-chatbot-container",launcher:"conservation-chatbot-launcher",header:"conservation-chatbot-header",messages:"conservation-chatbot-messages",input:"conservation-chatbot-input",sendButton:"conservation-chatbot-send-button",promptButtons:"conservation-chatbot-default-prompts",heartButton:"conservation-chatbot-heart-button",closeButton:"conservation-chatbot-close-button",remove:()=>{if(typeof document<"u"){const a=document.getElementById(e);a&&a.remove()}}}},O={dark:{colors:{primary:"#1a1a1a",secondary:"#333",background:"rgba(0, 0, 0, 0.8)",text:"#fff",textLight:"#fff"}},light:{colors:{primary:"#f8f9fa",secondary:"#e9ecef",background:"rgba(255, 255, 255, 0.9)",text:"#212529",textLight:"#495057"}},nature:{colors:{primary:"#2d5016",secondary:"#4a7c59",background:"rgba(76, 175, 80, 0.1)",accent:"#8bc34a"}},ocean:{colors:{primary:"#1976d2",secondary:"#42a5f5",background:"rgba(33, 150, 243, 0.1)",accent:"#64b5f6"}}};function U(n){if(Array.isArray(n))return n;if(typeof n=="string"){const e=n.split(",").map(a=>a.trim().toLowerCase());return k.filter(a=>e.includes(a.name.toLowerCase())||e.includes(a.label.toLowerCase())||e.includes(a.species.toLowerCase()))}return k}function _(n){const e={wildlife:"Focus on wildlife conservation, habitat protection, and anti-poaching efforts. Mention specific wildlife threats and how your organization helps.",marine:"Emphasize ocean conservation, marine life protection, and plastic pollution. Talk about marine ecosystems and ocean health.",forest:"Highlight forest conservation, deforestation issues, and biodiversity protection. Discuss rainforest preservation and tree planting.",climate:"Focus on climate change impacts, carbon emissions, and environmental activism. Discuss renewable energy and sustainability.",general:"Discuss general environmental conservation, sustainability, and how people can help protect the planet."};return e[n]||e.general}function H(n={}){const{apiKey:e,organization:a="Conservation Organization",organizationType:h="general",animals:s=k,styles:m={},container:d=document.body,options:b={}}=n;if(!e)return console.error("Conservation Chatbot: API key is required. Please provide your Gemini API key."),null;const r=U(s);if(r.length===0)return console.error("Conservation Chatbot: No valid animals found. Please check your animal selection."),null;let u=null;Object.keys(m).length>0&&(u=B(m));const v=_(h),y=t=>{const c=`${t.system} You are representing ${a}, a ${h} conservation organization. ${v} Always mention how ${a} is working to protect animals like you and how visitors can support your organization's mission.`;return Y({animal:{name:t.name,species:t.species,conservationStatus:t.conservationStatus,location:t.location},photo:t.photo,customPersonality:c,facts:[t.intro]})};return P(d,r,y),{updateStyles:t=>{u&&u.remove(),u=B(t)},removeCustomStyles:()=>{u&&(u.remove(),u=null)},getAnimals:()=>r,addAnimal:t=>{r.push(t);const c=typeof d=="string"?document.querySelector(d):d;if(c){const w=c.querySelector("#conservation-chatbot-container"),F=document.querySelector("#conservation-chatbot-launcher");w&&w.remove(),F&&F.remove(),P(c,r,y)}},removeAnimal:t=>{const c=r.findIndex(w=>w.id===t);if(c!==-1){r.splice(c,1);const w=typeof d=="string"?document.querySelector(d):d;if(w){const F=w.querySelector("#conservation-chatbot-container"),g=document.querySelector("#conservation-chatbot-launcher");F&&F.remove(),g&&g.remove(),P(w,r,y)}}},updateOrganization:(t,c)=>{console.log("Organization updated. Please re-initialize the chatbot for changes to take effect.")}}}const Z={initConservationChatbot:H,createAnimalChatbot:Y,renderChatbotUI:P,animals:k,createAnimal:G,createStyles:B,themePresets:O};x.animals=k,x.createAnimal=G,x.createAnimalChatbot=Y,x.createStyles=B,x.default=Z,x.initConservationChatbot=H,x.renderChatbotUI=P,x.themePresets=O,Object.defineProperties(x,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
