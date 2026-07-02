import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, N as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogClose, f as DialogContent$1, g as DialogTitle$1, h as DialogPortal$1, i as Description2, l as Trigger2, m as DialogOverlay$1, n as Cancel, o as Portal2, p as DialogDescription$1, r as Content2, s as Root2, t as Action, u as Dialog$1 } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
import { _ as Check, a as Sparkles, c as Pencil, d as Folder, f as FileText, g as ChevronDown, h as ChevronUp, i as Square, l as MessageSquarePlus, m as CircleUser, n as User, o as SendHorizontal, p as Copy, r as Trash2, s as Plus, t as X, u as LoaderCircle, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as CollapsibleTrigger$1, r as Root$1, t as CollapsibleContent$1 } from "../_libs/radix-ui__react-collapsible.mjs";
import { i as Trigger, n as Portal, r as Root2$1, t as Content2$1 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { i as formatDistanceToNow, n as subDays, r as isToday, t as isYesterday } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AKVhu9cg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-linear-to-br from-primary to-[var(--primary-glow)] text-primary-foreground shadow-[0_12px_30px_-16px_var(--primary)] hover:brightness-110 active:scale-[0.98]",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]",
			outline: "border border-input bg-card/55 shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98]",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[70px] w-full rounded-lg border border-input bg-card/55 px-3 py-2 text-base shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-ring/45 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function TypingDots() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-1 py-1",
		children: [
			0,
			150,
			300
		].map((delay) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-2 w-2 animate-bounce rounded-full bg-primary",
			style: { animationDelay: `${delay}ms` }
		}, delay))
	});
}
function CopyButton({ text }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		toast.success("Copied to clipboard");
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: copy,
		className: "rounded-lg border border-transparent p-1.5 text-muted-foreground transition-colors hover:border-border hover:bg-card/70 hover:text-foreground",
		title: "Copy bid",
		children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
	});
}
function UserBubble({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-end gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-[80%] rounded-2xl rounded-tr-md border border-primary/20 bg-linear-to-br from-primary/20 to-accent/30 px-4 py-3 shadow-lg shadow-black/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground/90 whitespace-pre-wrap",
				children: text
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-primary" })
		})]
	});
}
function AiBubble({ text, isStreaming = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-[var(--primary-glow)] text-xs font-bold text-primary-foreground shadow-lg shadow-primary/10",
			children: "AI"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children: isStreaming && !text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingDots, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prose prose-sm prose-invert max-w-none rounded-2xl border border-border/70 bg-card/55 px-4 py-3 text-foreground/90 shadow-lg shadow-black/10 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
					remarkPlugins: [remarkGfm],
					children: text
				}), isStreaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cursor-blink ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-primary align-middle" })]
			}), !isStreaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text })
			})] })
		})]
	});
}
function ChatView({ conversation, conversationLoading, streaming, streamText, streamingUserMessage, latestBidId, onRevise, onCancelStream }) {
	const [instruction, setInstruction] = (0, import_react.useState)("");
	const bottomRef = (0, import_react.useRef)(null);
	const textareaRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		conversation,
		streamText,
		streaming
	]);
	const canSubmit = !!latestBidId && instruction.trim().length > 0 && !streaming;
	const handleSubmit = () => {
		if (!canSubmit) return;
		onRevise(instruction.trim());
		setInstruction("");
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-canvas flex flex-1 flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "soft-scrollbar flex-1 overflow-y-auto px-4 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl space-y-6",
				children: [conversationLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingDots, {})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [conversation?.messages.map((msg, i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserBubble, { text: msg.memory_type === "bid_generation" ? `Generate bid for: ${conversation.job.title}` : msg.user_instruction ?? "" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiBubble, { text: msg.bid.bid_text })]
					}, i);
				}), (streaming || streamingUserMessage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [streamingUserMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserBubble, { text: streamingUserMessage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiBubble, {
						text: streamText,
						isStreaming: streaming
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottomRef })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/70 bg-background/90 px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2 rounded-2xl border border-border/80 bg-card/70 px-3 py-2 shadow-2xl shadow-black/15 transition-all focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						ref: textareaRef,
						value: instruction,
						maxLength: 1e3,
						onChange: (e) => setInstruction(e.target.value),
						onKeyDown: handleKeyDown,
						placeholder: latestBidId ? "Edit this bid… (e.g. make it shorter, add more about React experience)" : "Generate a bid to enable revisions",
						disabled: !latestBidId || streaming,
						rows: 1,
						className: "max-h-[160px] min-h-[24px] flex-1 resize-none border-0 bg-transparent p-0 text-sm shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0"
					}), streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground",
						onClick: onCancelStream,
						title: "Stop generating",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4 fill-current" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground disabled:opacity-30",
						disabled: !canSubmit,
						onClick: handleSubmit,
						title: "Send revision",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendHorizontal, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-center text-[11px] text-muted-foreground/50",
					children: "Press Enter to send · Shift+Enter for new line"
				})]
			})
		})]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-lg border border-input bg-card/55 px-3 py-1 text-base shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 hover:border-ring/45 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Collapsible = Root$1;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
function TagInput({ value, onChange, placeholder = "Type and press Enter", maxTags = 30, maxTagLength = 50, className = "" }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	const add = () => {
		const tag = draft.trim();
		if (!tag || value.includes(tag) || value.length >= maxTags) return;
		onChange([...value, tag]);
		setDraft("");
	};
	const remove = (tag) => onChange(value.filter((t) => t !== tag));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex min-h-10 flex-wrap gap-1.5 rounded-lg border border-input bg-card/55 px-2 py-1.5 shadow-sm transition-all hover:border-ring/45 focus-within:ring-1 focus-within:ring-ring ${className}`,
		children: [value.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs text-primary",
			children: [tag, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => remove(tag),
				className: "text-muted-foreground hover:text-foreground transition-colors",
				"aria-label": `Remove ${tag}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
			})]
		}, tag)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft,
			onChange: (e) => setDraft(e.target.value.slice(0, maxTagLength)),
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === ",") {
					e.preventDefault();
					add();
				} else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
			},
			onBlur: add,
			placeholder: value.length === 0 ? placeholder : "",
			className: "flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
		})]
	});
}
var empty = {
	title: "",
	description: "",
	budget: "",
	skills: [],
	country: "",
	hireRate: "",
	reviews: "",
	totalSpent: ""
};
function NewBidForm({ activeProfileId, onSubmit, isSubmitting }) {
	const [form, setForm] = (0, import_react.useState)(empty);
	const [clientOpen, setClientOpen] = (0, import_react.useState)(false);
	const set = (patch) => setForm((prev) => ({
		...prev,
		...patch
	}));
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.title.trim() || !form.description.trim()) return;
		const hasClient = form.country || form.hireRate || form.reviews || form.totalSpent;
		onSubmit({
			title: form.title.trim(),
			description: form.description.trim(),
			budget: form.budget.trim() || void 0,
			skills: form.skills,
			client_info: hasClient ? {
				country: form.country.trim() || void 0,
				hire_rate: form.hireRate.trim() || void 0,
				reviews: form.reviews ? parseFloat(form.reviews) : void 0,
				total_spent: form.totalSpent.trim() || void 0
			} : void 0,
			profile_id: activeProfileId ?? void 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "soft-scrollbar app-canvas flex flex-1 flex-col items-center justify-start overflow-y-auto px-4 py-10 sm:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-3xl space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-[var(--primary-glow)] text-primary-foreground shadow-xl shadow-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-primary-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold tracking-tight",
						children: "Generate a Bid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground",
						children: "Paste an Upwork job and get a tailored bid in seconds."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "glass-panel space-y-5 rounded-2xl p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "jt",
							children: ["Job Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "jt",
							required: true,
							maxLength: 200,
							value: form.title,
							onChange: (e) => set({ title: e.target.value }),
							placeholder: "e.g. Full-stack developer for SaaS dashboard"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "jd",
							children: ["Job Description ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "jd",
							required: true,
							rows: 8,
							maxLength: 1e4,
							value: form.description,
							onChange: (e) => set({ description: e.target.value }),
							placeholder: "Paste the full Upwork job description here...",
							className: "resize-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "budget",
								children: "Budget"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "budget",
								maxLength: 50,
								value: form.budget,
								onChange: (e) => set({ budget: e.target.value }),
								placeholder: "$500–800"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Required Skills" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
								value: form.skills,
								onChange: (skills) => set({ skills }),
								placeholder: "Add skills..."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
						open: clientOpen,
						onOpenChange: setClientOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
							className: "flex w-full items-center justify-between rounded-xl border border-border bg-card/45 px-4 py-3 text-sm font-medium transition-colors hover:bg-card/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: ["Client Info ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground/60",
									children: "(optional)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 text-muted-foreground transition-transform ${clientOpen ? "rotate-180" : ""}` })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleContent, {
							className: "grid gap-3 pt-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "country",
										children: "Country"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "country",
										maxLength: 100,
										value: form.country,
										onChange: (e) => set({ country: e.target.value }),
										placeholder: "United States"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "hire-rate",
										children: "Hire Rate"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "hire-rate",
										maxLength: 20,
										value: form.hireRate,
										onChange: (e) => set({ hireRate: e.target.value }),
										placeholder: "85%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "reviews",
										children: "Reviews"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "reviews",
										type: "number",
										step: "0.1",
										min: "0",
										max: "5",
										value: form.reviews,
										onChange: (e) => set({ reviews: e.target.value }),
										placeholder: "4.8"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "total-spent",
										children: "Total Spent"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "total-spent",
										maxLength: 50,
										value: form.totalSpent,
										onChange: (e) => set({ totalSpent: e.target.value }),
										placeholder: "$12,000"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							disabled: isSubmitting || !form.title.trim() || !form.description.trim(),
							className: "gap-2 px-8 shadow-xl shadow-primary/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Generate Bid"]
						})
					})
				]
			})]
		})
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("glass-panel fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("glass-panel fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var API_BASE = "http://localhost:8000";
async function consumeStream(res, onEvent) {
	if (!res.body) throw new Error("No response body");
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() ?? "";
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed.startsWith("data:")) continue;
			const data = trimmed.slice(5).trim();
			if (!data) continue;
			try {
				onEvent(JSON.parse(data));
			} catch {}
		}
	}
}
async function fetchProfiles() {
	const res = await fetch(`${API_BASE}/api/v1/profiles`);
	if (!res.ok) throw new Error("Failed to fetch profiles");
	return res.json();
}
async function createProfile(data) {
	const res = await fetch(`${API_BASE}/api/v1/profiles`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error("Failed to create profile");
	return res.json();
}
async function updateProfile(id, data) {
	const res = await fetch(`${API_BASE}/api/v1/profiles/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error("Failed to update profile");
	return res.json();
}
async function deleteProfile(id) {
	if (!(await fetch(`http://localhost:8000/api/v1/profiles/${id}`, { method: "DELETE" })).ok) throw new Error("Failed to delete profile");
}
async function fetchProjects(profileId) {
	const params = new URLSearchParams();
	if (profileId) params.set("profile_id", profileId);
	const query = params.toString();
	const res = await fetch(`${API_BASE}/api/v1/projects${query ? `?${query}` : ""}`);
	if (!res.ok) throw new Error("Failed to fetch projects");
	return res.json();
}
async function createProject(data) {
	const res = await fetch(`${API_BASE}/api/v1/projects`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error("Failed to create project");
	return res.json();
}
async function updateProject(id, data) {
	const res = await fetch(`${API_BASE}/api/v1/projects/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error("Failed to update project");
	return res.json();
}
async function deleteProject(id) {
	if (!(await fetch(`http://localhost:8000/api/v1/projects/${id}`, { method: "DELETE" })).ok) throw new Error("Failed to delete project");
}
async function fetchPrompts() {
	const res = await fetch(`${API_BASE}/api/v1/prompts`);
	if (!res.ok) throw new Error("Failed to fetch prompts");
	return res.json();
}
async function updatePrompt(id, prompt) {
	const res = await fetch(`${API_BASE}/api/v1/prompts/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ prompt })
	});
	if (!res.ok) throw new Error("Failed to update prompt");
	return res.json();
}
async function createPrompt(type, prompt) {
	const res = await fetch(`${API_BASE}/api/v1/prompts`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			type,
			prompt
		})
	});
	if (!res.ok) throw new Error("Failed to create prompt");
	return res.json();
}
async function fetchJobs(profileId, limit = 50) {
	const params = new URLSearchParams({ limit: String(limit) });
	if (profileId) params.set("profile_id", profileId);
	const res = await fetch(`${API_BASE}/api/v1/jobs?${params}`);
	if (!res.ok) throw new Error("Failed to fetch jobs");
	return res.json();
}
async function fetchJobConversation(jobId) {
	const res = await fetch(`${API_BASE}/api/v1/jobs/${jobId}/conversation`);
	if (!res.ok) throw new Error("Failed to fetch conversation");
	return res.json();
}
async function streamGenerateBid(payload, onEvent, signal) {
	const res = await fetch(`${API_BASE}/api/v1/jobs/generate-bid`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		signal
	});
	if (!res.ok || !res.body) throw new Error("Failed to start bid stream");
	await consumeStream(res, onEvent);
}
async function streamRevision(jobId, bidId, instruction, onEvent, signal) {
	const res = await fetch(`${API_BASE}/api/v1/jobs/${jobId}/bids/${bidId}/revise`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ instruction }),
		signal
	});
	if (!res.ok || !res.body) throw new Error("Failed to start revision stream");
	await consumeStream(res, onEvent);
}
function ProfileModal({ open, profile, onClose, onSave, onDelete }) {
	const [name, setName] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) {
			setName(profile?.name ?? "");
			setBio(profile?.bio ?? "");
			setSkills(profile?.skills ?? []);
		}
	}, [open, profile]);
	const handleSave = async () => {
		if (!name.trim()) {
			toast.error("Name is required");
			return;
		}
		setSaving(true);
		try {
			const data = {
				name: name.trim(),
				bio: bio.trim() || void 0,
				skills
			};
			onSave(profile ? await updateProfile(profile.id, data) : await createProfile(data));
			toast.success(profile ? "Profile updated" : "Profile created");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to save profile");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		if (!profile) return;
		setDeleting(true);
		try {
			await deleteProfile(profile.id);
			onDelete(profile.id);
			toast.success("Profile deleted");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to delete profile");
		} finally {
			setDeleting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: profile ? "Edit Profile" : "New Profile" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "profile-name",
								children: ["Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "profile-name",
								value: name,
								maxLength: 100,
								onChange: (e) => setName(e.target.value),
								placeholder: "e.g. Full-Stack Developer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "profile-bio",
								children: "Bio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "profile-bio",
								value: bio,
								maxLength: 1e3,
								rows: 3,
								onChange: (e) => setBio(e.target.value),
								placeholder: "Brief description of your expertise..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
								value: skills,
								onChange: setSkills,
								placeholder: "Add skills..."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex-row items-center justify-between gap-2 sm:justify-between",
					children: [profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "gap-1.5 text-destructive hover:text-destructive",
							disabled: deleting,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Delete"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete profile?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
						"This will permanently delete \"",
						profile.name,
						"\". This action cannot be undone."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: handleDelete,
						className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
						children: deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Delete"
					})] })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 ml-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: onClose,
							disabled: saving,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleSave,
							disabled: saving,
							children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), profile ? "Save Changes" : "Create Profile"]
						})]
					})]
				})
			]
		})
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between whitespace-nowrap rounded-lg border border-input bg-card/55 px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer transition-all data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("glass-panel relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-xl text-popover-foreground shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function emptyForm(defaultProfileId) {
	return {
		title: "",
		description: "",
		skills: [],
		techStack: [],
		outcome: "",
		profileId: defaultProfileId
	};
}
function formFromProject(p) {
	return {
		title: p.title,
		description: p.description,
		skills: p.skills ?? [],
		techStack: p.tech_stack ?? [],
		outcome: p.outcome ?? "",
		profileId: p.profile_id
	};
}
function ProjectsModal({ open, profiles, activeProfileId, onClose }) {
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("list");
	const [filterProfileId, setFilterProfileId] = (0, import_react.useState)("all");
	const [form, setForm] = (0, import_react.useState)(emptyForm(""));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setView("list");
		setFilterProfileId("all");
		loadProjects();
	}, [open]);
	const loadProjects = async () => {
		setLoading(true);
		try {
			setProjects(await fetchProjects());
		} catch {
			toast.error("Failed to load projects");
		} finally {
			setLoading(false);
		}
	};
	const filteredProjects = filterProfileId === "all" ? projects : projects.filter((p) => p.profile_id === filterProfileId);
	const profileName = (id) => profiles.find((p) => p.id === id)?.name ?? id;
	const goNew = () => {
		setForm(emptyForm(activeProfileId ?? profiles[0]?.id ?? ""));
		setView("new");
	};
	const goEdit = (project) => {
		setForm(formFromProject(project));
		setView({
			type: "edit",
			project
		});
	};
	const goList = () => setView("list");
	const handleSave = async () => {
		if (!form.title.trim()) return toast.error("Title is required");
		if (!form.description.trim()) return toast.error("Description is required");
		if (!form.profileId) return toast.error("Please select a profile");
		setSaving(true);
		try {
			if (view === "new") {
				const created = await createProject({
					title: form.title.trim(),
					description: form.description.trim(),
					skills: form.skills,
					tech_stack: form.techStack,
					outcome: form.outcome.trim() || void 0,
					profile_id: form.profileId
				});
				setProjects((prev) => [created, ...prev]);
				toast.success("Project added");
			} else if (typeof view === "object" && view.type === "edit") {
				const updated = await updateProject(view.project.id, {
					title: form.title.trim(),
					description: form.description.trim(),
					skills: form.skills,
					tech_stack: form.techStack,
					outcome: form.outcome.trim() || void 0,
					profile_id: form.profileId
				});
				setProjects((prev) => prev.map((p) => p.id === updated.id ? updated : p));
				toast.success("Project updated");
			}
			goList();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to save project");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await deleteProject(deleteId);
			setProjects((prev) => prev.filter((p) => p.id !== deleteId));
			toast.success("Project deleted");
		} catch {
			toast.error("Failed to delete project");
		} finally {
			setDeleteId(null);
		}
	};
	const isFormView = view === "new" || typeof view === "object" && view.type === "edit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-2xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "px-6 py-4 border-b border-border shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [isFormView && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: goList,
							className: "rounded p-1 text-muted-foreground hover:text-foreground transition-colors -ml-1",
							"aria-label": "Back to list",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isFormView ? view === "new" ? "New Reference Project" : "Edit Reference Project" : "Reference Projects" })]
					}), !isFormView && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Past projects used as RAG context to improve bid quality."
					})]
				}),
				!isFormView && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-4 py-3 border-b border-border shrink-0",
					children: [profiles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filterProfileId,
						onValueChange: setFilterProfileId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-44 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All Profiles"
						}), profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: p.id,
							children: p.name
						}, p.id))] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "ml-auto h-8 gap-1.5",
						onClick: goNew,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add New"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
					}) : filteredProjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-16 gap-2 text-center px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No reference projects yet."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: goNew,
							children: "Add your first project"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: filteredProjects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "group flex items-start gap-3 px-4 py-4 hover:bg-accent/30 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-foreground truncate",
											children: project.title
										}), profiles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground shrink-0",
											children: profileName(project.profile_id)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed",
										children: project.description
									}),
									project.skills?.length || project.tech_stack?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1 mt-2",
										children: [...project.skills ?? [], ...project.tech_stack ?? []].slice(0, 6).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground",
											children: tag
										}, tag))
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => goEdit(project),
									className: "rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
									"aria-label": "Edit project",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDeleteId(project.id),
									className: "rounded p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
									"aria-label": "Delete project",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})]
							})]
						}, project.id))
					})
				})] }),
				isFormView && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto px-6 py-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "proj-title",
								children: ["Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "proj-title",
								value: form.title,
								maxLength: 200,
								onChange: (e) => setForm((f) => ({
									...f,
									title: e.target.value
								})),
								placeholder: "e.g. E-commerce platform rebuild"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "proj-desc",
								children: ["Description ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "proj-desc",
								value: form.description,
								maxLength: 5e3,
								rows: 4,
								onChange: (e) => setForm((f) => ({
									...f,
									description: e.target.value
								})),
								placeholder: "What you built, the problem it solved, your role..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills Used" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
									value: form.skills,
									onChange: (v) => setForm((f) => ({
										...f,
										skills: v
									})),
									placeholder: "Add skills..."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tech Stack" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
									value: form.techStack,
									onChange: (v) => setForm((f) => ({
										...f,
										techStack: v
									})),
									placeholder: "React, FastAPI..."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "proj-outcome",
								children: "Outcome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "proj-outcome",
								value: form.outcome,
								maxLength: 1e3,
								rows: 2,
								onChange: (e) => setForm((f) => ({
									...f,
									outcome: e.target.value
								})),
								placeholder: "Results, metrics, client feedback..."
							})]
						}),
						profiles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.profileId,
								onValueChange: (v) => setForm((f) => ({
									...f,
									profileId: v
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select profile" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: p.id,
									children: p.name
								}, p.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: goList,
								disabled: saving,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleSave,
								disabled: saving,
								children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), view === "new" ? "Add Project" : "Save Changes"]
							})]
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: !!deleteId,
		onOpenChange: (o) => !o && setDeleteId(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete project?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This will permanently remove the project from your reference library. Existing bids are not affected." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			onClick: handleDelete,
			children: "Delete"
		})] })] })
	})] });
}
function PromptsModal({ open, onClose }) {
	const [prompts, setPrompts] = (0, import_react.useState)([]);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [editContent, setEditContent] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	const [newType, setNewType] = (0, import_react.useState)("");
	const [newPromptText, setNewPromptText] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setIsCreating(false);
		setLoading(true);
		fetchPrompts().then((data) => {
			setPrompts(data);
			if (data.length > 0) {
				setSelectedId(data[0].id);
				setEditContent(data[0].prompt);
			}
		}).catch(() => toast.error("Failed to load prompts")).finally(() => setLoading(false));
	}, [open]);
	const selectedPrompt = prompts.find((p) => p.id === selectedId);
	const handleSelect = (p) => {
		setIsCreating(false);
		setSelectedId(p.id);
		setEditContent(p.prompt);
	};
	const handleNewClick = () => {
		setIsCreating(true);
		setSelectedId(null);
		setNewType("");
		setNewPromptText("");
	};
	const handleCancelNew = () => {
		setIsCreating(false);
		if (prompts.length > 0) {
			setSelectedId(prompts[0].id);
			setEditContent(prompts[0].prompt);
		}
	};
	const handleCreate = async () => {
		if (!newType.trim()) return toast.error("Type is required");
		if (!newPromptText.trim()) return toast.error("Prompt text is required");
		setSaving(true);
		try {
			const created = await createPrompt(newType.trim(), newPromptText.trim());
			setPrompts((prev) => [...prev, created]);
			setIsCreating(false);
			setSelectedId(created.id);
			setEditContent(created.prompt);
			toast.success("Prompt created");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to create prompt");
		} finally {
			setSaving(false);
		}
	};
	const handleSave = async () => {
		if (!selectedId) return;
		setSaving(true);
		try {
			const updated = await updatePrompt(selectedId, editContent);
			setPrompts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
			toast.success("Prompt saved");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to save prompt");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "px-6 py-4 border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "System Prompts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Universal — apply to all profiles"
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 min-h-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-44 shrink-0 border-r border-border flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-3 py-2 border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
							children: "Prompts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleNewClick,
							className: "rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
							"aria-label": "New prompt",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto",
						children: [
							isCreating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 py-3 text-sm font-medium bg-accent text-accent-foreground",
								children: "New Prompt"
							}),
							prompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleSelect(p),
								className: `w-full px-4 py-3 text-left text-sm transition-colors ${!isCreating && selectedId === p.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`,
								children: p.type
							}, p.id)),
							prompts.length === 0 && !isCreating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 py-4 text-xs text-muted-foreground",
								children: "No prompts yet."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 flex-col min-w-0 p-4 gap-3",
					children: isCreating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "new-type",
									children: "Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "new-type",
									value: newType,
									onChange: (e) => setNewType(e.target.value),
									placeholder: "e.g. bid_generation",
									maxLength: 100
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prompt" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 min-h-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "h-full resize-none font-mono text-xs leading-relaxed",
								value: newPromptText,
								onChange: (e) => setNewPromptText(e.target.value),
								placeholder: "Write the system prompt..."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: handleCancelNew,
								disabled: saving,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleCreate,
								disabled: saving,
								size: "sm",
								children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }), "Create"]
							})]
						})
					] }) : selectedPrompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: selectedPrompt.type
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 min-h-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "h-full resize-none font-mono text-xs leading-relaxed",
								value: editContent,
								onChange: (e) => setEditContent(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleSave,
								disabled: saving,
								size: "sm",
								children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }), "Save"]
							})
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Select a prompt to edit"
						})
					})
				})]
			})]
		})
	});
}
var Popover = Root2$1;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2$1.displayName;
function groupJobs(jobs) {
	const weekAgo = subDays(/* @__PURE__ */ new Date(), 7);
	const groups = [];
	const todayJobs = jobs.filter((j) => isToday(new Date(j.created_at)));
	const yesterdayJobs = jobs.filter((j) => isYesterday(new Date(j.created_at)));
	const weekJobs = jobs.filter((j) => {
		const d = new Date(j.created_at);
		return d >= weekAgo && !isToday(d) && !isYesterday(d);
	});
	const olderJobs = jobs.filter((j) => new Date(j.created_at) < weekAgo);
	if (todayJobs.length) groups.push({
		label: "Today",
		jobs: todayJobs
	});
	if (yesterdayJobs.length) groups.push({
		label: "Yesterday",
		jobs: yesterdayJobs
	});
	if (weekJobs.length) groups.push({
		label: "Last 7 days",
		jobs: weekJobs
	});
	if (olderJobs.length) groups.push({
		label: "Older",
		jobs: olderJobs
	});
	return groups;
}
function Sidebar({ profiles, activeProfileId, jobs, selectedJobId, onSelectProfile, onSelectJob, onNewBid, onNewProfile, onEditProfile, onOpenProjects, onOpenPrompts }) {
	const [profileOpen, setProfileOpen] = (0, import_react.useState)(false);
	const activeProfile = profiles.find((p) => p.id === activeProfileId);
	const jobGroups = groupJobs(jobs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex w-72 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar/95 shadow-2xl shadow-black/25",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-sidebar-border/80 px-4 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-[var(--primary-glow)] text-primary-foreground shadow-lg shadow-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold text-sidebar-foreground",
							children: "BidCraft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: "AI bid workspace"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-sidebar-border/80 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					open: profileOpen,
					onOpenChange: setProfileOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex w-full items-center gap-2 rounded-xl border border-sidebar-border/80 bg-sidebar-accent/30 px-3 py-2.5 text-sm font-medium text-sidebar-foreground shadow-sm transition-all hover:border-sidebar-ring/50 hover:bg-sidebar-accent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { className: "h-5 w-5 shrink-0 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 truncate text-left",
									children: activeProfile?.name ?? "Select profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" })
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
						className: "glass-panel w-64 rounded-xl p-1.5",
						side: "bottom",
						align: "start",
						children: [
							profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 rounded-lg hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex-1 truncate px-2.5 py-2 text-left text-sm",
									onClick: () => {
										onSelectProfile(p.id);
										setProfileOpen(false);
									},
									children: p.id === activeProfileId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: p.name
									}) : p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "mr-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-background/30 hover:text-foreground",
									onClick: (e) => {
										e.stopPropagation();
										onEditProfile(p);
										setProfileOpen(false);
									},
									"aria-label": `Edit ${p.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" })
								})]
							}, p.id)),
							profiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 border-t border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								onClick: () => {
									onNewProfile();
									setProfileOpen(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "New Profile"]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "h-10 w-full justify-start gap-2",
					onClick: onNewBid,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, { className: "h-4 w-4" }), "New Bid"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "soft-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-4",
				children: jobGroups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-sidebar-border/80 bg-sidebar-accent/20 px-4 py-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-sidebar-foreground",
						children: "No bids yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: "Start a new bid and your conversations will collect here."
					})]
				}) : jobGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: group.jobs.map((job) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onSelectJob(job.id),
							className: `w-full rounded-xl border px-3 py-2.5 text-left transition-all ${job.id === selectedJobId ? "border-sidebar-ring/50 bg-sidebar-accent text-sidebar-foreground shadow-lg shadow-primary/5" : "border-transparent text-sidebar-foreground/75 hover:border-sidebar-border hover:bg-sidebar-accent/55 hover:text-sidebar-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm leading-snug",
								children: job.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: formatDistanceToNow(new Date(job.created_at), { addSuffix: true })
							})]
						}) }, job.id);
					})
				})] }, group.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 border-t border-sidebar-border/80 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full justify-start gap-2 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
					onClick: onOpenProjects,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "h-4 w-4" }), "Reference Projects"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full justify-start gap-2 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
					onClick: onOpenPrompts,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), "Prompts"]
				})]
			})
		]
	});
}
var GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
var STORED_USER_KEY = "google_auth_user";
function readStoredUser() {
	try {
		const value = localStorage.getItem(STORED_USER_KEY);
		return value ? JSON.parse(value) : null;
	} catch {
		return null;
	}
}
function AuthenticatedChatApp() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [hasCheckedStorage, setHasCheckedStorage] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setUser(readStoredUser());
		setHasCheckedStorage(true);
	}, []);
	if (!hasCheckedStorage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "app-canvas min-h-screen" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleAuthPage, { onAuthSuccess: setUser });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatApp, {});
}
function GoogleAuthPage({ onAuthSuccess }) {
	const buttonRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const googleClientId = "598910498520-3fjfgoec6rgecg3dopsa42chke77gjar.apps.googleusercontent.com";
	const apiBase = "http://localhost:8000";
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const handleCredential = async (response) => {
			const credential = response.credential;
			if (!credential) {
				setError("Google did not return a credential.");
				return;
			}
			setIsSubmitting(true);
			setError("");
			try {
				const res = await fetch(`${apiBase}/api/v1/auth/google`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ credential })
				});
				if (!res.ok) throw new Error("Google sign-in failed.");
				const data = await res.json();
				try {
					localStorage.setItem(STORED_USER_KEY, JSON.stringify(data.user));
				} catch {}
				onAuthSuccess(data.user);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Google sign-in failed.");
			} finally {
				setIsSubmitting(false);
			}
		};
		const renderGoogleButton = () => {
			if (cancelled || !buttonRef.current || !window.google) return;
			buttonRef.current.innerHTML = "";
			window.google.accounts.id.initialize({
				client_id: googleClientId,
				callback: handleCredential
			});
			window.google.accounts.id.renderButton(buttonRef.current, {
				theme: "outline",
				size: "large",
				type: "standard",
				shape: "rectangular",
				text: "signin_with",
				width: 280
			});
		};
		if (window.google) {
			renderGoogleButton();
			return;
		}
		const existingScript = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
		if (existingScript) {
			existingScript.addEventListener("load", renderGoogleButton, { once: true });
			return () => {
				cancelled = true;
				existingScript.removeEventListener("load", renderGoogleButton);
			};
		}
		const script = document.createElement("script");
		script.src = GOOGLE_SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.onload = renderGoogleButton;
		script.onerror = () => setError("Could not load Google sign-in.");
		document.head.appendChild(script);
		return () => {
			cancelled = true;
			script.onload = null;
			script.onerror = null;
		};
	}, [
		apiBase,
		googleClientId,
		onAuthSuccess
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "app-canvas relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient-grid" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-2xl shadow-black/30 lg:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative hidden min-h-[36rem] overflow-hidden border-r border-border/60 p-8 lg:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-orbit" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "auth-float glass-panel absolute left-8 top-10 w-64 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.24em] text-primary",
							children: "BidCraft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl font-semibold leading-tight",
							children: "Turn job posts into sharp proposals."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "auth-float glass-panel absolute bottom-14 left-12 w-56 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-3 h-2 w-20 rounded-full bg-primary/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 rounded-full bg-foreground/20" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-10/12 rounded-full bg-foreground/14" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-7/12 rounded-full bg-foreground/10" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "auth-float glass-panel absolute bottom-24 right-10 w-52 rounded-2xl p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-xl bg-linear-to-br from-primary to-[var(--primary-glow)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 rounded-full bg-foreground/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-3/5 rounded-full bg-foreground/12" })]
							})]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex min-h-[34rem] flex-col justify-center px-6 py-10 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-[var(--primary-glow)] text-xl font-bold text-primary-foreground shadow-xl shadow-primary/20",
									children: "B"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-sm font-medium uppercase tracking-[0.22em] text-primary",
									children: "Welcome Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-semibold tracking-tight",
									children: "Sign in to your bid workspace"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: "Continue with Google to access your profiles, reference projects, prompts, and bid conversations."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-panel rounded-2xl p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									ref: buttonRef,
									"aria-label": "Sign in with Google"
								}),
								isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: "Signing in..."
								}) : null,
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-destructive",
									role: "alert",
									children: error
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs leading-relaxed text-muted-foreground/75",
							children: "Google authentication only. No password forms, no extra signup flow."
						})
					]
				})
			})]
		})]
	});
}
function ChatApp() {
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [activeProfileId, setActiveProfileId] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem("activeProfileId");
		} catch {
			return null;
		}
	});
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [selectedJobId, setSelectedJobId] = (0, import_react.useState)(null);
	const [conversation, setConversation] = (0, import_react.useState)(null);
	const [conversationLoading, setConversationLoading] = (0, import_react.useState)(false);
	const [showNewBidForm, setShowNewBidForm] = (0, import_react.useState)(true);
	const [streaming, setStreaming] = (0, import_react.useState)(false);
	const [streamText, setStreamText] = (0, import_react.useState)("");
	const [streamingUserMessage, setStreamingUserMessage] = (0, import_react.useState)("");
	const [profileModalOpen, setProfileModalOpen] = (0, import_react.useState)(false);
	const [editingProfile, setEditingProfile] = (0, import_react.useState)(null);
	const [projectsModalOpen, setProjectsModalOpen] = (0, import_react.useState)(false);
	const [promptsModalOpen, setPromptsModalOpen] = (0, import_react.useState)(false);
	const abortRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			if (activeProfileId) localStorage.setItem("activeProfileId", activeProfileId);
			else localStorage.removeItem("activeProfileId");
		} catch {}
	}, [activeProfileId]);
	(0, import_react.useEffect)(() => {
		fetchProfiles().then((data) => {
			setProfiles(data);
			if (data.length > 0) setActiveProfileId((prev) => {
				if (prev && data.find((p) => p.id === prev)) return prev;
				return data[0].id;
			});
		}).catch(() => toast.error("Failed to load profiles"));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!activeProfileId) return;
		fetchJobs(activeProfileId).then(setJobs).catch(() => toast.error("Failed to load jobs"));
	}, [activeProfileId]);
	const loadConversation = async (jobId) => {
		setConversationLoading(true);
		try {
			setConversation(await fetchJobConversation(jobId));
		} catch {
			toast.error("Failed to load conversation");
		} finally {
			setConversationLoading(false);
		}
	};
	const reloadJobs = async () => {
		if (!activeProfileId) return;
		try {
			setJobs(await fetchJobs(activeProfileId));
		} catch {}
	};
	const handleSelectProfile = (id) => {
		abortRef.current?.abort();
		setActiveProfileId(id);
		setSelectedJobId(null);
		setConversation(null);
		setShowNewBidForm(true);
		setStreaming(false);
		setStreamText("");
		setStreamingUserMessage("");
	};
	const handleSelectJob = (jobId) => {
		if (streaming) abortRef.current?.abort();
		setSelectedJobId(jobId);
		setConversation(null);
		setShowNewBidForm(false);
		setStreaming(false);
		setStreamText("");
		setStreamingUserMessage("");
		loadConversation(jobId);
	};
	const handleNewBid = () => {
		if (streaming) abortRef.current?.abort();
		setSelectedJobId(null);
		setConversation(null);
		setShowNewBidForm(true);
		setStreaming(false);
		setStreamText("");
		setStreamingUserMessage("");
	};
	const handleGenerateBid = async (payload) => {
		abortRef.current?.abort();
		const ctrl = new AbortController();
		abortRef.current = ctrl;
		setShowNewBidForm(false);
		setSelectedJobId(null);
		setConversation(null);
		setStreaming(true);
		setStreamText("");
		setStreamingUserMessage(`Generate bid for: ${payload.title}`);
		let finalJobId;
		try {
			await streamGenerateBid(payload, (evt) => {
				if (evt.type === "chunk" && evt.content) setStreamText((prev) => prev + evt.content);
				else if (evt.type === "done") finalJobId = evt.job_id;
			}, ctrl.signal);
			if (finalJobId) {
				setSelectedJobId(finalJobId);
				await reloadJobs();
				setConversation(await fetchJobConversation(finalJobId));
			}
		} catch (err) {
			if (err.name !== "AbortError") {
				toast.error(err instanceof Error ? err.message : "Failed to generate bid");
				setShowNewBidForm(true);
			}
		} finally {
			if (abortRef.current === ctrl) {
				setStreaming(false);
				setStreamText("");
				setStreamingUserMessage("");
				abortRef.current = null;
			}
		}
	};
	const handleRevise = async (instruction) => {
		if (!selectedJobId || !conversation) return;
		const latestBid = conversation.messages[conversation.messages.length - 1]?.bid;
		if (!latestBid) return;
		abortRef.current?.abort();
		const ctrl = new AbortController();
		abortRef.current = ctrl;
		setStreaming(true);
		setStreamText("");
		setStreamingUserMessage(instruction);
		try {
			await streamRevision(selectedJobId, latestBid.id, instruction, (evt) => {
				if (evt.type === "chunk" && evt.content) setStreamText((prev) => prev + evt.content);
			}, ctrl.signal);
			setConversation(await fetchJobConversation(selectedJobId));
		} catch (err) {
			if (err.name !== "AbortError") toast.error(err instanceof Error ? err.message : "Revision failed");
		} finally {
			if (abortRef.current === ctrl) {
				setStreaming(false);
				setStreamText("");
				setStreamingUserMessage("");
				abortRef.current = null;
			}
		}
	};
	const latestBidId = conversation?.messages[conversation.messages.length - 1]?.bid?.id ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
				profiles,
				activeProfileId,
				jobs,
				selectedJobId,
				onSelectProfile: handleSelectProfile,
				onSelectJob: handleSelectJob,
				onNewBid: handleNewBid,
				onNewProfile: () => {
					setEditingProfile(null);
					setProfileModalOpen(true);
				},
				onEditProfile: (p) => {
					setEditingProfile(p);
					setProfileModalOpen(true);
				},
				onOpenProjects: () => setProjectsModalOpen(true),
				onOpenPrompts: () => setPromptsModalOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 flex-col min-w-0 overflow-hidden",
				children: !showNewBidForm || streaming || !!selectedJobId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatView, {
					conversation,
					conversationLoading,
					streaming,
					streamText,
					streamingUserMessage,
					latestBidId,
					onRevise: handleRevise,
					onCancelStream: () => abortRef.current?.abort()
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewBidForm, {
					profiles,
					activeProfileId,
					onSubmit: handleGenerateBid,
					isSubmitting: streaming
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileModal, {
				open: profileModalOpen,
				profile: editingProfile,
				onClose: () => setProfileModalOpen(false),
				onSave: (saved) => {
					setProfiles((prev) => editingProfile ? prev.map((p) => p.id === saved.id ? saved : p) : [...prev, saved]);
					if (!editingProfile) setActiveProfileId(saved.id);
					setProfileModalOpen(false);
				},
				onDelete: (id) => {
					setProfiles((prev) => prev.filter((p) => p.id !== id));
					if (activeProfileId === id) setActiveProfileId(profiles.filter((p) => p.id !== id)[0]?.id ?? null);
					setProfileModalOpen(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsModal, {
				open: projectsModalOpen,
				profiles,
				activeProfileId,
				onClose: () => setProjectsModalOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptsModal, {
				open: promptsModalOpen,
				onClose: () => setPromptsModalOpen(false)
			})
		]
	});
}
//#endregion
export { AuthenticatedChatApp as component };
