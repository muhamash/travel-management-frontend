import
    {
        Camera,
        CheckCircle,
        TriangleAlert,
        XCircle,
    } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type ToastType = "success" | "warning" | "error" | "info" | "danger";

interface CustomToastOptions {
  message: string;
  type?: ToastType;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function useCustomToast() {
  const iconByType: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="text-white" size={24} />,
    warning: <TriangleAlert className="text-white" size={24} />,
    error: <XCircle className="text-white" size={24} />,
    info: <Camera className="text-white" size={24} />,
    danger: <Camera className="text-white" size={24} />,
  };

    const gradientGlassStyle = ( type: ToastType ): React.CSSProperties =>
    {
        const gradients: Record<ToastType, string> = {
            success: "linear-gradient(135deg, rgba(46, 204, 112, 0.486) 0%, rgba(39, 174, 96, 0.4) 100%)",
            warning: "linear-gradient(135deg, rgba(243, 202, 18, 0.491) 0%, rgba(211, 84, 0, 0.4) 100%)",
            error: "linear-gradient(135deg, rgba(230, 44, 23, 0.52) 0%, rgba(192, 57, 43, 0.4) 100%)",
            info: "linear-gradient(135deg, rgba(52, 211, 219, 0.476) 0%, rgba(41, 128, 185, 0.4) 100%)",
            danger: "linear-gradient(135deg, rgba(168, 16, 41, 0.646) 0%, rgba(90, 13, 30, 0.4) 100%)",
        };

        return {
            background: gradients[ type ],
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(10px) saturate(180%)",
            borderRadius: 20,
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            color: "#fff",
            fontWeight: 600,
            padding: "14px 22px",
            maxWidth: 420,
            display: "flex",
            alignItems: "center",
            gap: 14,
            overflow: "hidden",
            cursor: "default",
        };
    };

    const showToast = ( {
        message,
        type = "info",
        onConfirm,
        onCancel,
        ...rest
    }: CustomToastOptions ) =>
    {
        if ( type === "danger" && ( onConfirm || onCancel ) )
        {
            toast.custom( ( { id } ) => (
                <div style={{ ...gradientGlassStyle( type ), flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%" }}>
                        {iconByType[ type ]}
                        <span>{message}</span>
                    </div>

                    <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", width: "100%", gap: 12 }}>
                        <button
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                borderRadius: 12,
                                padding: "8px 20px",
                                color: "#fff",
                                fontWeight: "700",
                                cursor: "pointer",
                                border: "1.5px solid rgba(255,255,255,0.4)",
                                transition: "background-color 0.3s ease",
                            }}
                            onClick={() =>
                            {
                                toast.dismiss( id );
                                if ( onConfirm ) onConfirm();
                            }}
                            onMouseEnter={( e ) => ( e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.35)" )}
                            onMouseLeave={( e ) => ( e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)" )}
                        >
                            Confirm
                        </button>

                        <button
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: 12,
                                padding: "8px 20px",
                                color: "rgba(255,255,255,0.8)",
                                fontWeight: "700",
                                cursor: "pointer",
                                border: "1.5px solid rgba(255,255,255,0.3)",
                                transition: "background-color 0.3s ease",
                            }}
                            onClick={() =>
                            {
                                toast.dismiss( id );
                                if ( onCancel ) onCancel();
                            }}
                            onMouseEnter={( e ) => ( e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)" )}
                            onMouseLeave={( e ) => ( e.currentTarget.style.backgroundColor = "transparent" )}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ), {
                duration: 10000,
                ...rest,
            } );
        } else
        {
            toast( message, {
                icon: iconByType[ type ],
                style: gradientGlassStyle( type ),
                duration: rest.duration || 4500,
                ...rest,
            } );
        }
    };

    return { showToast };
};
