import { NotesContext } from './NotesContext.jsx'
import { useNotes } from '../hooks/daily_notes/useNotes.jsx'

export const NotesProvider = ({ children }) => {
    const notes = useNotes();
    return (
        <NotesContext.Provider value={notes}>
            {children}
        </NotesContext.Provider>
    )
}