---
description: Principles for using AI wisely in software development.
language: en
section: principles
---

# Principles

1. Submit only code you can **defend**

    A developer should be able to explain the important choices in the code they propose: its logic, trade-offs, limits, and rejected alternatives.

    The goal is not to know every detail by heart, but to be able to justify what enters the codebase.

2. Treat every generation as a **proposal**

    Code produced by an LLM is never a validated answer. It is a working hypothesis, just like an example found online or a suggestion from a teammate.

    It must therefore be evaluated, corrected, or rejected before adoption.

3. Keep control **proportional to impact**

    The more critical, complex, hard to reverse, or expensive to maintain a change is, the higher the expected level of understanding and verification should be.

    Not all lines carry the same risk, but no line becomes reliable just because it was generated confidently.

4. Prefer **mastered code** over impressive code

    A simple, well-understood, and appropriate solution is better than a sophisticated one that nobody truly masters.

    AI should not encourage technical one-upmanship, premature abstraction, or unnecessary concepts.

5. **Reduce** before you add

    The ease of generation should not lead to producing more code than needed.

    Every addition creates future cost: reading, testing, maintenance, documentation, security, and evolution. Generating quickly does not make this cost disappear.

6. Write for the **next reader**

    Code should not only work. Its intent should be accessible to the person who will review, modify, or diagnose it later.

    Readability is not an aesthetic preference: it is a condition for collective accountability.

7. Take ownership of the **validation work** before review

    A submission (pull request) should present work that is already understood, reviewed, tested, cleaned up, and clarified.

    Review is there to challenge choices, detect blind spots, and improve a proposal, not to perform the author's first round of verification.

8. Take on the same **accountability**, whatever the code origin

    Accountability for a line belongs to the person who submits it, not to the tool that generated it.

    "The AI wrote it" is neither an explanation, nor a justification, nor a mitigation of accountability.

9. Use the time saved to **raise quality**

    The benefit of AI should not be measured only in output volume or execution speed.

    Time saved should help us better understand the problem, examine edge cases, improve tests, simplify design, and document important decisions.

10. **Be willing to discard** a generation

    A suggestion that is hard to understand, verify, or simplify should be abandoned, even if it appears to work.

    The cost already invested in a conversation with an LLM never justifies integrating poorly mastered code.
