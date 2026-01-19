'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { modalVariants, overlayVariants } from '@/lib/animations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入信箱';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '請輸入有效的信箱格式';
    }

    if (!formData.question.trim()) {
      newErrors.question = '請輸入您的問題';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Submit to contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          question: formData.question,
          source: 'brand', // Default source
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error('Contact form submission failed:', result.message);
        // Still show success to user for better UX, as we don't want to block them
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Continue with success flow for better UX
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success (with cleanup ref)
    timeoutRef.current = setTimeout(() => {
      setFormData({ name: '', email: '', question: '' });
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">
                  聯絡我們
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="關閉"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-text-primary">
                    已收到您的訊息！
                  </p>
                  <p className="text-text-secondary mt-1">
                    我們會盡快回覆您
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      姓名
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="請輸入姓名"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      信箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="請輸入信箱"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Question */}
                  <div>
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      想問的問題
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                        errors.question ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="請輸入您想問的問題"
                    />
                    {errors.question && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.question}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        送出中...
                      </span>
                    ) : (
                      '送出'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
