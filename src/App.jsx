
import React, { useState } from 'react';
import {
  Bus, TrainFront, Hotel, ArrowLeftRight, CalendarDays,
  MapPin, Search, Star, Wifi, Snowflake, Menu
} from 'lucide-react';

const sampleBuses = [
  {
    id: 1,
    name: 'IntrCity SmartBus',
    type: 'AC Sleeper (2+1)',
    depart: '21:30',
    arrive: '06:15',
    duration: '8h 45m',
    price: 899,
    rating: '4.6',
    seats: 12
  },
  {
    id: 2,
    name: 'zingbus',
    type: 'AC Seater / Sleeper',
    depart: '22:15',
    arrive: '07:00',
    duration: '8h 45m',
    price: 749,
    rating: '4.4',
    seats: 8
  },
  {
    id: 3,
    name: 'National Travels',
    type: 'Volvo AC Multi-Axle',
    depart: '20:45',
    arrive: '05:30',
    duration: '8h 45m',
    price: 1099,
    rating: '4.8',
    seats: 6
  }
];

export default function App() {
  const [from, setFrom] = useState('Pune');
  const [to, setTo] = useState('Mumbai');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState('Recommended');
  const [expanded, setExpanded] = useState(null);
  const [toast, setToast] = useState('');

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2500);
  };

  const buses = [...sampleBuses].sort((a, b) =>
    sort === 'Lowest price'
      ? a.price - b.price
      : sort === 'Top rated'
      ? Number(b.rating) - Number(a.rating)
      : a.depart.localeCompare(b.depart)
  );

  const submit = (event) => {
    event.preventDefault();

    if (!from.trim() || !to.trim()) {
      return notify('Enter both cities to search');
    }

    setSearched(true);
  };

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon"><Bus size={24} /></span>
          <b>red<span>Bus</span></b>
        </a>

        <nav>
          <a className="selected" href="#search">Bus tickets</a>
          <a href="#offers">Offers</a>
          <a href="#routes">Popular routes</a>
          <a href="#footer">Help</a>
        </nav>

        <button className="sign-in" onClick={() => notify('Sign in demo')}>
          Sign in
        </button>

        <button className="mobile-menu" aria-label="Menu">
          <Menu />
        </button>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">TRAVEL MADE SIMPLE</p>

          <h1>
            Where would you<br />
            <span>like to go?</span>
          </h1>

          <p className="hero-sub">
            Find your bus. Pick your seat. Enjoy the journey.
          </p>

          <form className="search-card" id="search" onSubmit={submit}>
            <div className="tabs">
              <span className="tab active"><Bus size={18} /> Buses</span>
              <span className="tab"><TrainFront size={18} /> Trains</span>
              <span className="tab"><Hotel size={18} /> Hotels</span>
            </div>

            <div className="search-fields">
              <label>
                <small>FROM</small>
                <div>
                  <MapPin />
                  <input
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    aria-label="From city"
                  />
                </div>
              </label>

              <button
                type="button"
                className="swap"
                aria-label="Swap cities"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
              >
                <ArrowLeftRight />
              </button>

              <label>
                <small>TO</small>
                <div>
                  <MapPin />
                  <input
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    aria-label="To city"
                  />
                </div>
              </label>

              <label className="date-field">
                <small>DATE OF JOURNEY</small>
                <div>
                  <CalendarDays />
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
              </label>

              <button className="search-button">
                <Search size={19} /> Search buses
              </button>
            </div>
          </form>
        </div>
      </section>

      <main>
        <section className="trust">
          <div>
            <span>✓</span>
            <b>Safe and secure</b>
            <small>Travel with confidence</small>
          </div>

          <div>
            <Star />
            <b>Trusted operators</b>
            <small>Quality rides every time</small>
          </div>

          <div>
            <Bus />
            <b>Easy seat selection</b>
            <small>Your journey, your choice</small>
          </div>
        </section>

        <section id="offers" className="section">
          <div className="section-title">
            <div>
              <p className="eyebrow red">EXCLUSIVE DEALS</p>
              <h2>Offers for your next trip</h2>
            </div>
            <a href="#search">View all offers →</a>
          </div>

          <div className="offers">
            <article className="offer coral">
              <small>BUS OFFER</small>
              <h3>Save up to ₹250</h3>
              <p>On your first bus booking</p>
              <b>FIRST</b>
            </article>

            <article className="offer purple">
              <small>WEEKEND SPECIAL</small>
              <h3>Travel more, spend less</h3>
              <p>Deals on selected routes</p>
              <b>WEEKEND</b>
            </article>

            <article className="offer gold">
              <small>APP EXCLUSIVE</small>
              <h3>Extra rewards await</h3>
              <p>Book your next trip today</p>
              <b>REWARDS</b>
            </article>
          </div>
        </section>

        <section className="section" id="results">
          <div className="section-title">
            <div>
              <p className="eyebrow red">YOUR JOURNEY</p>
              <h2>
                {searched ? `${from} to ${to}` : 'Popular bus services'}
              </h2>
              <p className="muted">
                {searched
                  ? `Showing sample buses for ${date}`
                  : 'Explore comfortable rides for your next trip'}
              </p>
            </div>

            <select
              className="sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option>Recommended</option>
              <option>Lowest price</option>
              <option>Top rated</option>
            </select>
          </div>

          <div className="bus-list">
            {buses.map(bus => (
              <article className="bus-card" key={bus.id}>
                <div className="bus-main">
                  <div className="operator">
                    <span className="bus-symbol"><Bus /></span>
                    <div>
                      <b>{bus.name}</b>
                      <small>{bus.type}</small>
                    </div>
                  </div>

                  <div className="time">
                    <b>{bus.depart}</b>
                    <small>{from}</small>
                  </div>

                  <div className="duration">
                    <span></span>
                    <small>{bus.duration}</small>
                  </div>

                  <div className="time">
                    <b>{bus.arrive}</b>
                    <small>{to}</small>
                  </div>

                  <div className="price">
                    <b>₹{bus.price}</b>
                    <small>onwards</small>
                  </div>
                </div>

                <div className="bus-bottom">
                  <span><Wifi /> Wi-Fi</span>
                  <span><Snowflake /> AC</span>
                  <span>★ {bus.rating}</span>
                  <small>{bus.seats} seats left</small>

                  <button
                    className="outline"
                    onClick={() =>
                      setExpanded(expanded === bus.id ? null : bus.id)
                    }
                  >
                    {expanded === bus.id ? 'Hide seats' : 'View seats'}
                  </button>
                </div>

                {expanded === bus.id && (
                  <div className="seat-panel">
                    <b>Choose your seat</b>

                    <div>
                      {['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B'].map(
                        (seat, i) => (
                          <button
                            key={seat}
                            disabled={i === 2}
                            onClick={() =>
                              notify(`${seat} selected — demo only`)
                            }
                          >
                            {seat}
                          </button>
                        )
                      )}
                    </div>

                    <small>
                      Demo only. No booking or payment is processed.
                    </small>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="routes">
          <div className="section-title">
            <div>
              <p className="eyebrow red">GET INSPIRED</p>
              <h2>Popular routes</h2>
            </div>
          </div>

          <div className="route-grid">
            {[
              ['Pune', 'Mumbai', '3h 30m', '₹299'],
              ['Mumbai', 'Goa', '12h', '₹699'],
              ['Pune', 'Bengaluru', '14h', '₹899'],
              ['Delhi', 'Jaipur', '5h 30m', '₹399']
            ].map(route => (
              <button
                className="route"
                key={route[0] + route[1]}
                onClick={() => {
                  setFrom(route[0]);
                  setTo(route[1]);
                  document.getElementById('results').scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                <b>
                  {route[0]} <ArrowLeftRight size={15} /> {route[1]}
                </b>
                <small>{route[2]} · From {route[3]}</small>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer id="footer">
        <div>
          <a className="brand" href="#">
            <span className="brand-icon"><Bus /></span>
            <b>red<span>Bus</span></b>
          </a>
          <p>
            Making bus travel simpler, safer and more comfortable.
          </p>
        </div>

        <div>
          <b>About redBus</b>
          <a href="#offers">Offers</a>
          <a href="#routes">Popular routes</a>
        </div>

        <div>
          <b>Help</b>
          <a href="#footer">Contact support</a>
          <a href="#footer">FAQs</a>
        </div>

        <small>
          © 2026 redBus-inspired frontend demo. Not affiliated with redBus.
        </small>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
                      }
