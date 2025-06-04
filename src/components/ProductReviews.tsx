
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userName: "John Doe",
      rating: 5,
      comment: "Amazing product! Exactly what I was looking for. The quality is outstanding and delivery was fast.",
      date: "2024-01-15"
    },
    {
      id: 2,
      userName: "Sarah Smith",
      rating: 4,
      comment: "Great value for money. The product works as expected, though the packaging could be better.",
      date: "2024-01-10"
    },
    {
      id: 3,
      userName: "Mike Johnson",
      rating: 5,
      comment: "Exceeded my expectations! Will definitely recommend to friends and family.",
      date: "2024-01-05"
    }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate review submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review will be published shortly.",
    });

    setNewReview({ rating: 5, comment: '' });
    setIsSubmitting(false);
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Write a Review */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview(prev => ({ ...prev, rating }))
              )}
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Your Review
              </label>
              <Textarea
                id="comment"
                placeholder="Share your experience with this product..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                required
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
