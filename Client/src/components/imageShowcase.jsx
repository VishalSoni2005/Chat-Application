import av1 from "/Avatars/Av1.jpg";
import av2 from "/Avatars/Av2.jpg";
import av3 from "/Avatars/Av3.jpg";
import av4 from "/Avatars/Av4.jpg";
import av5 from "/Avatars/Av5.jpg";

import { ChartColumnIncreasing } from "lucide-react";

const avatars = [av1, av2, av3, av4, av5];

const ImageShowcase = () => {
  return (
    <div className="from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 relative hidden items-center justify-center overflow-hidden bg-gradient-to-br lg:flex">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 dark:opacity-5"></div>

      <div className="relative z-10 max-w-2xl p-8 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src="/family_img.jpg"
              alt="Join our community"
              className="mt-4 w-full max-w-md rounded-2xl object-cover shadow-xl"
            />
            <div className="bg-primary text-primary-foreground absolute -bottom-4 -right-4 rounded-full px-6 py-2 shadow-lg">
              Join today!
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Connect with friends and family
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg text-lg">
            Join our growing community and stay connected with the people who matter most to you.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="border-background bg-accent flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2">
                  <img
                    src={`${avatars[i - 1]}`}
                    alt={`User ${i}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <span className="text-muted-foreground flex justify-center items-center gap-2">
              <ChartColumnIncreasing className="size-5" />
              <span> New members every day </span>
            </span>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-primary">
                ★
              </div>
            ))}
            <span className="text-muted-foreground ml-2">Rated 4.9/5 by our users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageShowcase;
