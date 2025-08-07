import './App.css';
import PostList from './Components/PostList';

function App() {
  const posts = [
  { id: 1, title: "פוסט ראשון", body: "תוכן הפוסט הראשון" },
  { id: 2, title: "פוסט שני", body: "תוכן הפוסט השני" },
  { id: 3, title: "פוסט שלישי", body: "תוכן הפוסט השלישי" },
  { id: 4, title: "פוסט רביעי", body: "תוכן הפוסט הרביעי" },
  { id: 5, title: "פוסט חמישי", body: "תוכן הפוסט טטט" },
  { id: 6, title: "פוסט שישי", body: "תוכן הפוסט ווו" },
  { id: 7, title: "פוסט גכד", body: "תוכן הפוסט םםם" },
  { id: 8, title: "פוסט כגד", body: "תוכן הפוסט ךךך" },
  { id: 9, title: "פוסט כג", body: "תוכן הפוסט חחח" },
  { id: 10, title: "פוסט כג", body: "תוכן הפוסט דד" },
  { id: 11, title: "פוסט דג", body: "תוכן הפוסט ככ" },
  { id: 12, title: "פוסט 33", body: "תוכן הפוסט עע" },
  { id: 13, title: "פוסט שליקרשי", body: "תוכן הפוסט ככ" },
  { id: 14, title: "פוסט ככ", body: "תוכן הפוסט 33" },
  { id: 15, title: "פוסט בב", body: "תוכן הפוסט 44" },
  { id: 16, title: "פוסט הה", body: "תוכן הפוסט כככ" },
  { id: 17, title: "פוסט רר", body: "תוכן הפוסט ההה" },
];

  return (
    <div className="App">
      <header className="App-header">
        <h1>רשימת הפוסטים</h1>
        <PostList posts = {posts}/>

      </header>
    </div>
  );
}

export default App;
