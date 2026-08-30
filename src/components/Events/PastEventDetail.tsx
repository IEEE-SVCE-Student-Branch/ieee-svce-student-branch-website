import React from "react";
import { EventShowcaseRecord } from "@/lib/data/events-showcase";
import { EventMedia } from "./EventMedia";
import { EventGallery } from "./EventGallery";
import { PersonAvatar } from "./PersonAvatar";
import { AwardIcon, DocumentIcon } from "./EventIcons";
import styles from "./PastEventDetail.module.css";

interface PastEventDetailProps {
  event: EventShowcaseRecord;
}

export function PastEventDetail({ event }: PastEventDetailProps) {
  const hasSpeakers = event.speakers && event.speakers.length > 0;
  const hasJudgingPanel = event.judgingPanel && event.judgingPanel.length > 0;
  const hasWinners = event.winners && event.winners.length > 0;
  const hasGallery = event.gallery && event.gallery.length > 0;
  const hasSchedule = event.schedule && event.schedule.length > 0;

  const firstPrize = event.winners?.find((w) => w.position === "First Prize");
  const runnerUp = event.winners?.find((w) => w.position === "Runner-Up");
  const thirdPrize = event.winners?.find((w) => w.position === "Third Prize");

  return (
    <div className={styles.wrapper}>
      {/* Event Header / Banner */}
      <div className={styles.banner}>
        <EventMedia
          alt={`${event.title} event banner`}
          label={`${event.category.toUpperCase()} ARCHIVE`}
          src={event.image}
        />
      </div>

      <div className={styles.logisticsBar}>
        <div>
          <span className={`mono ${styles.logisticsLabel}`}>DATE</span>
          <div className={styles.logisticsValue}>{event.date}</div>
        </div>
        <div>
          <span className={`mono ${styles.logisticsLabel}`}>VENUE</span>
          <div className={styles.logisticsValue}>{event.venue}</div>
        </div>
        <div>
          <span className={`mono ${styles.logisticsLabel}`}>STATUS</span>
          <div className={styles.logisticsValue}>Concluded</div>
        </div>
      </div>

      {/* About the Event */}
      <div className={styles.panel}>
        <span className={`mono ${styles.sectionEyebrow}`}>{"// ABOUT THE EVENT"}</span>
        <h2 className={styles.sectionTitle}>Event Overview</h2>
        <p className={styles.bodyText}>{event.description}</p>

        {(event.theme || event.objective) && (
          <div className={styles.subFactGrid}>
            {event.theme && (
              <div>
                <span className={`mono ${styles.subFactLabel}`}>THEME</span>
                <div className={styles.subFactValue}>{event.theme}</div>
              </div>
            )}
            {event.objective && (
              <div>
                <span className={`mono ${styles.subFactLabel}`}>OBJECTIVE</span>
                <div className={styles.subFactValue}>{event.objective}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Schedule */}
      {hasSchedule && (
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// TIME SEQUENCE"}</span>
            <h2 className={styles.sectionTitle}>Event Schedule</h2>
          </div>
          <div className={styles.scheduleList}>
            {event.schedule!.map((item, idx) => (
              <div className={styles.scheduleRow} key={idx}>
                <div className={`mono ${styles.scheduleTime}`}>{item.time}</div>
                <div>
                  <div className={styles.scheduleSession}>{item.session}</div>
                  <div className={styles.scheduleActivity}>{item.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Speakers */}
      {hasSpeakers && (
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// DISTINGUISHED PRESENTERS"}</span>
            <h2 className={styles.sectionTitle}>Speakers</h2>
          </div>
          <div className={styles.peopleGrid}>
            {event.speakers!.map((person, idx) => (
              <div className={styles.personCard} key={idx}>
                <div className={styles.personPhoto}>
                  <PersonAvatar name={person.name} photo={person.photo} size={64} />
                </div>
                <div>
                  <div className={styles.personName}>{person.name}</div>
                  <div className={`mono ${styles.personDesignation}`}>{person.designation}</div>
                  <div className={styles.personOrganization}>{person.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Judging Panel */}
      {hasJudgingPanel && (
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// EVALUATION COMMITTEE"}</span>
            <h2 className={styles.sectionTitle}>Judging Panel</h2>
          </div>
          <div className={styles.peopleGrid}>
            {event.judgingPanel!.map((person, idx) => (
              <div className={styles.personCard} key={idx}>
                <div className={styles.personPhoto}>
                  <PersonAvatar name={person.name} photo={person.photo} size={64} />
                </div>
                <div>
                  <div className={styles.personName}>{person.name}</div>
                  <div className={`mono ${styles.personDesignation}`}>{person.designation}</div>
                  <div className={styles.personOrganization}>{person.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Winners & Results */}
      {hasWinners && (
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// CONTEST RESULTS"}</span>
            <h2 className={styles.sectionTitle}>Winners &amp; Results</h2>
          </div>
          <div className={styles.winnersGrid}>
            {runnerUp && <WinnerCard winner={runnerUp} />}
            {firstPrize && <WinnerCard winner={firstPrize} isFirst />}
            {thirdPrize && <WinnerCard winner={thirdPrize} />}
          </div>
        </div>
      )}

      {/* Event Gallery */}
      {hasGallery && (
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// PHOTO ARCHIVE"}</span>
            <h2 className={styles.sectionTitle}>Event Gallery</h2>
          </div>
          <EventGallery images={event.gallery!} eventTitle={event.title} />
        </div>
      )}

      {/* Event Report + Certificates */}
      <div className={styles.actionPanelRow}>
        {event.report?.available && (
          <div className={styles.panel}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// PROCEEDINGS"}</span>
            <h2 className={styles.sectionTitle}>Event Report</h2>
            <p className={styles.bodyText}>
              A detailed report covering the proceedings, attendance, and outcomes of this event
              is available for reference.
            </p>
            <a
                href={event.report.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
                >
              VIEW EVENT REPORT
            </a>
          </div>
        )}

        {event.certificates?.available && (
          <div className={styles.panel}>
            <span className={`mono ${styles.sectionEyebrow}`}>{"// CREDENTIALS"}</span>
            <h2 className={styles.sectionTitle}>Certificates</h2>
            <p className={styles.bodyText}>
              Participation and winner certificates for this event can be verified or downloaded
              below.
            </p>
            <a
              href={event.certificates.url || "#"}
              className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
            >
              <AwardIcon size={15} />
              VIEW CERTIFICATES
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function WinnerCard({
  winner,
  isFirst = false,
}: {
  winner: NonNullable<EventShowcaseRecord["winners"]>[number];
  isFirst?: boolean;
}) {
  return (
    <div className={`${styles.winnerCard} ${isFirst ? styles.winnerCardFirst : ""}`}>
      <div className={styles.winnerPhoto}>
        <PersonAvatar name={winner.name} photo={winner.photo} size={isFirst ? 104 : 84} />
      </div>
      <span className={`mono ${styles.winnerPosition}`}>{winner.position.toUpperCase()}</span>
      <div className={styles.winnerName}>{winner.name}</div>
      {winner.institution && <div className={styles.winnerInstitution}>{winner.institution}</div>}
    </div>
  );
}