// Dashboard.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';

const playlist = [
  {
    title: "Canción 1",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    quote: "El ritmo que te inspira a estudiar",
    image: "https://i.pinimg.com/originals/9e/23/f0/9e23f0e8bacb5f03ad6418a3bdd1727b.jpg"
  },
  {
    title: "Canción 2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    quote: "Concentración y calma en cada nota",
    image: "https://i.pinimg.com/originals/ae/b0/10/aeb0109a1a5f38a784c06c14a7ae2efe.jpg"
  },
  {
    title: "Canción 3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    quote: "Estudios con energía positiva",
    image: "https://i.pinimg.com/originals/9e/23/f0/9e23f0e8bacb5f03ad6418a3bdd1727b.jpg"
  },
];

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentSongIndex]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const nextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % playlist.length);
    setIsPlaying(true);
  };
  const prevSong = () => {
    setCurrentSongIndex((currentSongIndex - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };
  const onTimeUpdate = () => setProgress(audioRef.current.currentTime);
  const onLoadedMetadata = () => setDuration(audioRef.current.duration);
  const onProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div className="app-container">
        <header>
          <h1>Planeación</h1>
          <nav className="desktop-nav">
            <a onClick={() => navigate("/diario")}>Diario</a>
            <a onClick={() => navigate("/estudio")}>Estudio</a>
            <a onClick={() => navigate("/metas")}>Metas</a>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </nav>
        </header>

        <section className="main-image-container">
          <img src="https://i.pinimg.com/originals/9e/23/f0/9e23f0e8bacb5f03ad6418a3bdd1727b.jpg" alt="Fondo principal" />
        </section>

        <div className="section-header">
          <span className="section-line"></span>
          <span>Planea tus días</span>
        </div>

        <div className="cards-grid">
          <Card label="Diario" path="/diario" image="https://i.pinimg.com/736x/bb/6f/c0/bb6fc0a06e6ef59663f97b7d18e36546.jpg" />
          <Card label="Estudio" path="/estudio" image="https://i.pinimg.com/736x/ae/b0/10/aeb0109a1a5f38a784c06c14a7ae2efe.jpg" />
          <Card label="Metas" path="/metas" image="https://i.pinimg.com/736x/9e/a8/76/9ea8768fa1572e429d4945efd87e1561.jpg" />
          <Card
            image="https://i.pinimg.com/736x/ee/04/af/ee04af1241bd9326256fb218b8be3500.jpg"
            alt="Lámpara de escritorio encendida con taza de café y ventana de noche"
            label="Anual"
            path="/anual"
          />
          <Card
            image="https://i.pinimg.com/736x/a9/59/db/a959db38f6b0ca5fed58fe852027102c.jpg"
            alt="Montón de libros apilados en una biblioteca iluminada"
            label="Mensual"
            path="/mensual"
          />
          <Card
            image="https://i.pinimg.com/736x/10/c8/9a/10c89a224c18b4c7c9dbbc8a981e1bba.jpg"
            alt="Lámpara de escritorio encendida con taza de café y ventana de noche"
            label="Semanal"
            path="/semanal"
          />
          <Card
            image="https://i.pinimg.com/736x/31/6b/be/316bbed5f0a767e1dd2dce83cb6b6575.jpg"
            alt="Montón de libros apilados en una biblioteca iluminada"
            label="Planificadores"
          />
          <Card
            image="https://i.pinimg.com/736x/9e/30/e1/9e30e161c63e664be16c730a0c095b82.jpg"
            alt="Lámpara de escritorio encendida con taza de café y ventana de noche"
            label="Personal"
          />
          <Card
            image="https://i.pinimg.com/736x/9e/30/e1/9e30e161c63e664be16c730a0c095b82.jpg"
            alt="Lámpara de escritorio encendida con taza de café y ventana de noche"
            label="Estadísticas"
          />
        </div>

        <section className="calendar-section">
          <Calendar onChange={setSelectedDate} value={selectedDate} locale="es-ES" />
          <div className="music-player" style={{ maxWidth: 300 }}>
            <h3>{playlist[currentSongIndex].title}</h3>
            <img src={playlist[currentSongIndex].image} alt="Música" style={{ width: '100%', borderRadius: 10 }} />
            <p style={{ fontStyle: 'italic', textAlign: 'center' }}>"{playlist[currentSongIndex].quote}"</p>

            <audio ref={audioRef} src={playlist[currentSongIndex].url} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} onEnded={nextSong} />
            <input type="range" min={0} max={duration} value={progress} onChange={onProgressChange} />

            <div className="controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prevSong}><span className="material-icons">skip_previous</span></button>
              <button onClick={togglePlayPause}>
                <span className="material-icons">{isPlaying ? "pause_circle_filled" : "play_circle_filled"}</span>
              </button>
              <button onClick={nextSong}><span className="material-icons">skip_next</span></button>
            </div>
          </div>
        </section>

        <footer>
          &copy; {new Date().getFullYear()} Planeación App. Todos los derechos reservados.
        </footer>
      </div>
    </>
  );
}

function Card({ label, path, image }) {
  const navigate = useNavigate();
  return (
    <article className="card" onClick={() => navigate(path)} style={{ cursor: 'pointer' }}>
      <img src={image} alt={label} loading="lazy" />
      <div className="card-label">{label}</div>
    </article>
  );
}
