import React from "react";
import audioPlayer from "../../assets/images/play-icon.svg";
import styles from "./Dictionary.module.css";

const Dictionary = ({ fontSelected, darkTheme, handleSearchResult }) => {
  const wordData = handleSearchResult[0];
  const firstPhoneticWithAudio = wordData?.phonetics.find(
    (phonetic) => phonetic.audio
  );
  if (!handleSearchResult) {
    return (
      <div className={styles.no__result}>
        <h2>Oops ! 😕</h2>
        <p>
          We couldn't find the word you were looking for. Please try searching
          again with a different word!
        </p>
      </div>
    );
  }
  return (
    <main
      className={styles.main__element}
      style={{ fontFamily: fontSelected }}
      data-theme={darkTheme ? "dark" : "light"}
    >
      {wordData ? (
        <>
          <div className={styles.main__word}>
            <div className={styles.word__withphonetics}>
              <h1>{wordData.word}</h1>
              <p>{wordData.phonetics[0]?.text}</p>
            </div>
            {firstPhoneticWithAudio && (
              <button
                className={styles.audio__player}
                onClick={() => new Audio(firstPhoneticWithAudio.audio).play()}
              >
                <img src={audioPlayer} alt="Audio-Player" width="60" />
              </button>
            )}
          </div>

          {wordData.meanings
            .filter((meaning) => meaning.partOfSpeech === "noun")
            .map((meaning, index) => (
              <React.Fragment key={index}>
                <div className={styles.word__type}>
                  <h3>{meaning.partOfSpeech}</h3>
                  <p className={styles.horizontal__ruler}></p>
                </div>
                <div className={styles.word__meaning}>
                  <p>Meaning</p>
                  <ul>
                    {meaning.definitions.map((definition, defIndex) => (
                      <li key={defIndex}>{definition.definition}</li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ))}

          {wordData.meanings.some((meaning) => meaning.synonyms.length > 0) && (
            <div className={styles.synonyms}>
              <p className={styles.synonyms__title}>Synonyms</p>
              <p className={styles.synonyms__content}>
                {wordData.meanings
                  .flatMap((meaning) => meaning.synonyms)
                  .join(", ")}
              </p>
            </div>
          )}

          {wordData.meanings
            .filter((meaning) => meaning.partOfSpeech === "verb")
            .map((meaning, index) => (
              <React.Fragment key={index}>
                <div className={styles.word__type}>
                  <h3>{meaning.partOfSpeech}</h3>
                  <p className={styles.horizontal__ruler}></p>
                </div>
                <div className={styles.word__meaning}>
                  <p>Meaning</p>
                  <ul>
                    {meaning.definitions.map((definition, defIndex) => (
                      <li key={defIndex}>
                        {definition.definition}
                        {definition.example && (
                          <p id={styles.verb__example}>
                            "{definition.example}"
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ))}
        </>
      ) : (
        <div className={styles.no__result}>
          <h2>Welcome to Wordmap !</h2>
          <p>Search for your favourite words and share the world.</p>
        </div>
      )}
    </main>
  );
};

export default Dictionary;
