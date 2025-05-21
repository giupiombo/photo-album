import PhotoAlbum from './components/PhotoAlbum';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <PhotoAlbum />
    </div>
  );
}

export default App;
