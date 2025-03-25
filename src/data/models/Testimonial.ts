export interface Testimonial {
    id: string;
    quote: { [key: string]: string };
    name: string;
    location: { [key: string]: string };
    imageUrl: string;
  }

  
export interface TestimonialResponse {
  testimonials: Testimonial[];
}