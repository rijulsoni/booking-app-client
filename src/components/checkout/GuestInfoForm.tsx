import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"

interface GuestInfoFormProps {
    onNext: () => void
    onBack: () => void
    formData: {
        firstName: string
        lastName: string
        email: string
        phone: string
        specialRequests: string
        isSubscribed: boolean
    }
    updateFormData: (data: Partial<GuestInfoFormProps["formData"]>) => void
}

export const GuestInfoForm: React.FC<GuestInfoFormProps> = ({
    onNext,
    onBack,
    formData,
    updateFormData
}) => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\+?[0-9\s\-()]{8,}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (field: string, value: any) => {
        updateFormData({ [field]: value })
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            toast({
                title: "Information saved",
                description: "Your guest information has been saved"
            })
            onNext()
        }, 800)
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div>
            <h2 className="text-2xl font-serif text-hotel-primary mb-2">Guest Information</h2>
            <p className="text-gray-600 mb-6">Please provide your contact details for this reservation</p>

            <form onSubmit={handleSubmit}>
                <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["firstName", "lastName"].map((field, idx) => (
                            <motion.div key={field} className="space-y-2" variants={item}>
                                <Label htmlFor={field} className={errors[field] ? "text-red-500" : ""}>
                                    {field === "firstName" ? "First Name *" : "Last Name *"}
                                </Label>
                                <Input
                                    id={field}
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    placeholder={`Enter your ${field === "firstName" ? "first" : "last"} name`}
                                    className={errors[field] ? "border-red-500" : ""}
                                />
                                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                            </motion.div>
                        ))}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div className="space-y-2" variants={item}>
                            <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="your.email@example.com"
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </motion.div>

                        <motion.div className="space-y-2" variants={item}>
                            <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>
                                Phone Number *
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => {
                                    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10)
                                    handleChange("phone", cleaned)
                                }}
                                className={`${errors.phone ? "border-red-500" : ""} appearance-none`}
                                placeholder="1234567890"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </motion.div>

                    </div>

                    {/* Special Requests */}
                    <motion.div className="space-y-2" variants={item}>
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <textarea
                            id="specialRequests"
                            className="min-h-[100px] w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={formData.specialRequests}
                            onChange={(e) => handleChange("specialRequests", e.target.value)}
                            placeholder="Let us know any preferences or requirements for your stay..."
                        />
                    </motion.div>

                    {/* Subscription */}
                    <motion.div className="flex items-start space-x-2" variants={item}>
                        <Checkbox
                            id="marketing"
                            checked={formData.isSubscribed}
                            onCheckedChange={(checked) => handleChange("isSubscribed", !!checked)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label htmlFor="marketing" className="text-sm font-medium">
                                Subscribe to receive exclusive offers and updates
                            </label>
                            <p className="text-sm text-muted-foreground">
                                We'll send you personalized offers and travel inspiration.
                            </p>
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4">
                        <Button type="button" onClick={onBack} variant="outline" disabled={isSubmitting}>
                            Back
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#1A365D] hover:bg-slate-900 text-white px-6 py-3 rounded-md transition-colors"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Continue to Payment"
                            )}
                        </Button>
                    </div>
                </motion.div>
            </form>
        </div>
    )
}
