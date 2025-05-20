import PhotoAlbum from './components/PhotoAlbum';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-lightBgPrimary dark:bg-darkBgPrimary text-lightText dark:text-darkText">
      <ThemeToggle />
      <PhotoAlbum />
    </div>
  );
}

export default App;
