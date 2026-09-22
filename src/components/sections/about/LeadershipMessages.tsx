import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/**
 * The leadership messages in full — chairman, director and principal — each
 * laid out the same way: portrait on the left, message beside it.
 */
export default function LeadershipMessages() {
  const { about } = useSiteContent();

  if (about.messages.length === 0) return null;

  return (
    <section id="leadership-messages" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            FROM OUR LEADERSHIP
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Messages
          </h2>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {about.messages.map((message) => (
            <article
              key={message.id}
              id={message.id}
              className="grid gap-6 sm:gap-10 lg:grid-cols-[320px_1fr] items-start scroll-mt-28"
            >
              {/* Portrait */}
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-[#e6ece8] shadow-xl bg-[#f7faf8]">
                  <img
                    src={message.imageUrl}
                    alt={message.name ? `${message.name}, ${message.designation}` : message.designation}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[260px] sm:h-[320px] object-cover object-top"
                  />
                </div>
                <div className="mt-3 text-center lg:text-left">
                  {message.name && (
                    <p style={{ color: GREEN }} className="font-serif font-bold text-base sm:text-lg">
                      {message.name}
                    </p>
                  )}
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                    {message.designation}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 style={{ color: GREEN }} className="font-serif text-xl sm:text-2xl font-bold mb-3">
                  {message.title}
                </h3>

                {message.quote && (
                  <p className="font-serif italic text-sm sm:text-base text-[#14452f] border-l-4 border-[#dfb455] pl-4 mb-4">
                    &ldquo;{message.quote}&rdquo;
                  </p>
                )}

                <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {message.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
