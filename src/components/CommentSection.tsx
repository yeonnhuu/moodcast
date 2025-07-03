import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Send } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

interface CommentSectionProps {
  entryId: string;
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  entryId, 
  comments, 
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      userId: 'current-user',
      userName: '나',
      createdAt: new Date()
    };

    onAddComment(comment);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-3">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white/10 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/90 text-xs font-medium">
                  {comment.userName}
                </span>
                <span className="text-white/60 text-xs">
                  {format(comment.createdAt, 'M.d HH:mm', { locale: ko })}
                </span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment */}
      <div className="flex gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="따뜻한 응원 메시지를 남겨보세요..."
          className="flex-1 min-h-[60px] bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs resize-none"
          maxLength={200}
        />
        <Button
          onClick={handleSubmit}
          disabled={!newComment.trim() || isSubmitting}
          size="sm"
          className="h-[60px] bg-white/20 hover:bg-white/30 text-white border-white/20"
        >
          <Send className="w-3 h-3" />
        </Button>
      </div>
      
      {newComment.length > 0 && (
        <div className="text-right">
          <span className="text-white/60 text-xs">
            {newComment.length}/200
          </span>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
