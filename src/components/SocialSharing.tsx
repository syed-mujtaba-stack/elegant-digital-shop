
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Link2, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SocialSharingProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
}

export const SocialSharing = ({ url, title, description, image }: SocialSharingProps) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description || '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The product link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard.",
        variant: "destructive"
      });
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out: ${title}`);
    const body = encodeURIComponent(`I thought you might be interested in this product:\n\n${title}\n${description || ''}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share:</span>
      
      {/* Native Share (mobile) */}
      {navigator.share && (
        <Button
          variant="outline"
          size="sm"
          onClick={nativeShare}
          className="px-3"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}

      {/* Social Media Buttons */}
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnFacebook}
        className="px-3"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={shareOnTwitter}
        className="px-3"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={shareViaEmail}
        className="px-3"
      >
        <Mail className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="px-3"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
