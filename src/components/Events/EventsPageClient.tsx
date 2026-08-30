"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  EVENT_CATEGORIES,
  EventCategory,
  EventShowcaseRecord,
  PAST_EVENTS,
  UPCOMING_EVENTS,
} from "@/lib/data/events-showcase";
import { EventMedia } from "./EventMedia";
import { CalendarIcon, ChevronDownIcon, PinIcon } from "./EventIcons";
import styles from "./EventsPageClient.module.css";

type EventsTab = "upcoming" | "past";
type CategoryFilter = "All" | EventCategory;

export function EventsPageClient() {
  const [activeTab, setActiveTab] = useState<EventsTab>("upcoming");

  const featuredEvent = useMemo(
    () => UPCOMING_EVENTS.find((event) => event.featured) ?? UPCOMING_EVENTS[0],
    []
  );
  const remainingUpcoming = useMemo(
    () => UPCOMING_EVENTS.filter((event) => event.id !== featuredEvent?.id),
    [featuredEvent]
  );

  return (
    <div>
      <div className={styles.tabRow} role="tablist" aria-label="Event listings">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "upcoming"}
          className={`${styles.tab} ${activeTab === "upcoming" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          UPCOMING EVENTS
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "past"}
          className={`${styles.tab} ${activeTab === "past" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("past")}
        >
          PAST EVENTS
        </button>
      </div>

      {activeTab === "upcoming" ? (
        <div className={styles.sectionBlock} role="tabpanel">
          {featuredEvent && (
            <div>
              <div className={styles.sectionHeadingRow}>
                <span className={`mono ${styles.eyebrow}`}>{"// NEXT UP"}</span>
                <h2 className={styles.sectionTitle}>Featured Event</h2>
              </div>
              <FeaturedEventCard event={featuredEvent} />
            </div>
          )}

          {remainingUpcoming.length > 0 && (
            <div>
              <div className={styles.sectionHeadingRow}>
                <span className={`mono ${styles.eyebrow}`}>{"// ACTIVE SCHEDULE"}</span>
                <h2 className={styles.sectionTitle}>Upcoming Events</h2>
              </div>
              <div className={styles.grid}>
                {remainingUpcoming.map((event) => (
                  <UpcomingEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <PastEventsSection />
      )}
    </div>
  );
}

/* ==========================================================================
   Featured event card
   ========================================================================== */

function FeaturedEventCard({ event }: { event: EventShowcaseRecord }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `featured-panel-${event.id}`;

  return (
    <div className={styles.featuredCard}>
      <button
        type="button"
        className={styles.featuredMediaButton}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <EventMedia
          alt={`${event.title} event banner`}
          label={`${event.category.toUpperCase()} EVENT`}
          src={event.image}
          fit="cover"
        />
      </button>

      <div className={styles.featuredBody}>
        <span className={`${styles.statusBadge} ${styles.statusUpcoming}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          UPCOMING
        </span>

        <div>
          <span className={styles.featuredTrack}>[ {event.category} ]</span>
          <h3 className={styles.featuredTitle}>{event.title}</h3>
        </div>

        <p className={styles.featuredDescription}>{event.shortDescription}</p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <CalendarIcon className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>DATE</span>
              <span className={styles.metaValue}>{event.date}</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <PinIcon className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>VENUE</span>
              <span className={styles.metaValue}>{event.venue}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.expandToggle}
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={panelId}
        >
          {expanded ? "SHOW LESS" : "MORE DETAILS"}
          <ChevronDownIcon
            size={16}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}
          />
        </button>

        <div
          id={panelId}
          className={`${styles.expandRegion} ${expanded ? styles.expandRegionOpen : ""}`}
        >
          <div className={styles.expandInner}>
            <div className={styles.expandContent}>
              <p>{event.description}</p>
              {event.theme && (
                <p>
                  <span className={styles.expandThemeLabel}>THEME: </span>
                  {event.theme}
                </p>
              )}
              {event.objective && (
                <p>
                  <span className={styles.expandThemeLabel}>OBJECTIVE: </span>
                  {event.objective}
                </p>
              )}
            </div>
          </div>
        </div>

        {event.registrationLink && (
          <div className={styles.actionsRow}>
            <Link href={event.registrationLink} className={styles.registerButton}>
              REGISTER NOW
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   Upcoming event card (grid)
   ========================================================================== */

function UpcomingEventCard({ event }: { event: EventShowcaseRecord }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `upcoming-panel-${event.id}`;

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.cardMediaButton}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <EventMedia
          alt={`${event.title} event image`}
          label={event.category.toUpperCase()}
          src={event.image}
          fit="contain"
        />
      </button>

      <div className={styles.cardBody}>
        <span className={`${styles.statusBadge} ${styles.statusUpcoming}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          UPCOMING
        </span>

        <h3 className={styles.cardTitle}>{event.title}</h3>

        <div className={styles.cardMetaRow}>
          <span className={styles.cardMetaItem}>
            <CalendarIcon size={14} className={styles.cardMetaIcon} />
            {event.date}
          </span>
          <span className={styles.cardMetaItem}>
            <PinIcon size={14} className={styles.cardMetaIcon} />
            {event.venue}
          </span>
        </div>

        <div
          id={panelId}
          className={`${styles.expandRegion} ${expanded ? styles.expandRegionOpen : ""}`}
        >
          <div className={styles.expandInner}>
            <div className={styles.cardExpandContent}>
              <p>{event.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.cardFooterRow}>
          <button
            type="button"
            className={styles.textLinkButton}
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            {expanded ? "SHOW LESS" : "DETAILS"}
            <ChevronDownIcon
              size={14}
              className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}
            />
          </button>

          {event.registrationLink && (
            <Link href={event.registrationLink} className={styles.viewEventButton}>
              REGISTER NOW
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Past events section (filters + grid)
   ========================================================================== */

function PastEventsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return PAST_EVENTS;
    return PAST_EVENTS.filter((event) => event.category === activeCategory);
  }, [activeCategory]);

  return (
    <div role="tabpanel">
      <div className={styles.sectionHeadingRow}>
        <span className={`mono ${styles.eyebrow}`}>{"// EVENT ARCHIVE"}</span>
        <h2 className={styles.sectionTitle}>Past Events</h2>
      </div>

      <div className={styles.filterRow} role="group" aria-label="Filter past events by category">
        {(["All", ...EVENT_CATEGORIES] as CategoryFilter[]).map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.filterChip} ${
              activeCategory === category ? styles.filterChipActive : ""
            }`}
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <div className={styles.emptyState}>No events found in this category yet.</div>
      ) : (
        <div className={styles.grid}>
          {filteredEvents.map((event) => (
            <PastEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

function PastEventCard({ event }: { event: EventShowcaseRecord }) {
  return (
    <div className={styles.card}>
      <Link
        href={`/events/archive/${event.slug}`}
        className={styles.cardMediaButton}
        aria-label={`View full details for ${event.title}`}
      >
        <EventMedia
          alt={`${event.title} event image`}
          label={event.category.toUpperCase()}
          src={event.image}
        />
      </Link>

      <div className={styles.cardBody}>
        <span className={`${styles.statusBadge} ${styles.statusConcluded}`}>CONCLUDED</span>

        <h3 className={styles.cardTitle}>{event.title}</h3>

        <div className={styles.cardMetaRow}>
          <span className={styles.cardMetaItem}>
            <CalendarIcon size={14} className={styles.cardMetaIcon} />
            {event.date}
          </span>
          <span className={styles.cardMetaItem}>
            <PinIcon size={14} className={styles.cardMetaIcon} />
            {event.venue}
          </span>
        </div>

        <p className={styles.cardDescription}>{event.shortDescription}</p>

        <div className={styles.cardFooterRow} style={{ justifyContent: "flex-end" }}>
          <Link href={`/events/archive/${event.slug}`} className={styles.viewEventButton}>
            VIEW EVENT
          </Link>
        </div>
      </div>
    </div>
  );
}