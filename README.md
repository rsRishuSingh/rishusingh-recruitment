# 🎓 TNP-TASK – Student Share Link Dashboard

A responsive React-based dashboard tailored for Training & Placement (TNP) teams. It allows admins to generate and manage shareable links to student data, authenticate access, and view detailed student tables with filter options.

---

## 📸 Project Preview

> **Live Demo**: https://rishusingh-recruitment-53jypw8lh-rsrishusinghs-projects.vercel.app/

> _preview here_  
> ![Screenshot](https://github.com/user-attachments/assets/48923a31-a8ac-424a-b101-c099e3988b96)


---

## ⚙️ Tech Stack

- **React** (Functional components + Hooks)  
- **Tailwind CSS** (Modern utility-first styling)  
- **React Router DOM** (Client-side routing & protected routes)  
- **React Context API** (Global auth & alert state)  
- **LocalStorage** (Token persistence with expiry)

---

## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/TNP-TASK.git
   cd TNP-TASK
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run development server**  
   ```bash
   npm run dev
   ```  
   Open your browser at `http://localhost:5173`.

---

## 🗂️ Folder & File Structure

```
TNP-TASK/
├── public/                      
│   └── favicon.ico              
├── src/
│   ├── assets/                  
│   │   └── Profile_Photo.jpg    
│   │                          
│   ├── components/             
│   │   ├── Modal.jsx           
│   │   ├── Navbar.jsx          
│   │   ├── Spinner.jsx         
│   │   └── ProtectedRoute.jsx  
│   │                          
│   ├── context/                
│   │   └── auth/               
│   │       ├── AuthContext.jsx 
│   │       └── AuthProvider.jsx
│   │                          
│   ├── pages/                  
│   │   ├── HomePage.jsx        
│   │   ├── LoginPage.jsx       
│   │   ├── ShareLinkPage.jsx   
│   │   └── StudentDetailPage.jsx
│   │                          
│   ├── utils/                  
│   │   └── tokenStorage.js     
│   │                          
│   ├── App.jsx                 
│   ├── index.css               
│   └── main.jsx                
└── .gitignore                  
```

---

## 🔧 Functionality Overview

### Authentication & Session

- **`loginToAccount(credentials)`**  
  - Called in **LoginPage.jsx**  
  - On success: stores **accessToken** (15 min) and **refreshToken** (60 min) in LocalStorage via `setWithExpiry`  
  - On failure: shows error alert via `showAlert`

- **`logout()`**  
  - Clears `accessToken` and `refreshToken` from LocalStorage  
  - Stops token-refresh interval  
  - Redirects to login and shows success alert

---

### Share Link Workflow

- **`onClickGenerate()`**  
  - Called in **ShareLinkPage.jsx** when you click **Generate Shareable Link**  
  - Sends a POST to `/share`, retrieves `shareToken`  
  - Stores `shareToken` in LocalStorage with 30-day TTL via `setWithExpiry`  
  - Disables button and displays generated link

- **Copy to Clipboard**  
  - Button shows **Copy**, then **Copied** for 3s  
  - Uses `navigator.clipboard.writeText(link)`

---

### Student Details

- **`fetchAndSetStudentDetails(token)`**  
  - Called in **StudentDetailPage.jsx**  
  - Reads token from URL (`?shareToken=…`) or LocalStorage  
  - Fetches student data, sets state via context  
  - Filters by email using `useMemo`

- **Filtering & Display**  
  - Input field filters the table by email substring  
  - Responsive table shows `first_name`, `last_name`, `email`, `roll_no`

---

### Modal System

- **`Modal.jsx`**  
  - Consumes `alert` state from context  
  - Types: `success`, `error`, `info`, `warning`  
  - Slide-down on appear, slide-up on dismiss  
  - Manual (×) and auto-dismiss after 1.5s

---

## 🔐 LocalStorage Usage

| Key            | Purpose                        | TTL         |
|----------------|--------------------------------|-------------|
| `accessToken`  | Auth token                     | 15 minutes  |
| `refreshToken` | Refresh token                  | 60 minutes  |
| `shareToken`   | Student share link token       | 30 days     |

`utils/tokenStorage.js` provides:
```js
setWithExpiry(key, value, ttlInMinutes);
getWithExpiry(key);
```

---

## ⚙️ Assumptions

- Backend endpoints (`/login`, `/refresh`, `/share`, etc.) are functional.  
- Only admins generate share links.  
- Valid share token if present in URL or LocalStorage.  
- Responsive design tested on desktop & mobile.

---

## 📈 Future Enhancements

- Add pagination & sorting to student table.  
- Integrate real backend (REST/GraphQL).  
- User registration & role management.  
- Environment configs (Dev/Staging/Prod).  
- GitHub badges, contribution guidelines, license.

---

*Made by Rishu Singh*
