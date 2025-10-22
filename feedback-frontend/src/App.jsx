import { useState } from 'react'
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';



function App() {
  const [triggerReload, setTriggerReload] = useState(false);

  const handleNewFeedback = () => {
    // Trigger list reload
    setTriggerReload(!triggerReload)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Feedback Board</h1>
      <FeedbackForm onNewFeedback={handleNewFeedback}/>
      <FeedbackList key={triggerReload}/>
    </div>
  )
}

export default App
