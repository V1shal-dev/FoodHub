
import React, { useMemo, useState, useEffect } from 'react';
import { X, Star, Clock, Zap, Minus, Plus, ChefHat, AlertTriangle, ChevronDown, Check, CheckCircle, List } from 'lucide-react';
import type { FoodItem, Alternative, Addon } from '../types';

interface ItemDetailModalProps {
  item: FoodItem;
  onClose: () => void;
  onAddToCart: (item: FoodItem, quantity: number, customizations: { [key: string]: any }, finalPrice: number, instructions: string, addons: Addon[]) => void;
}

const AccordionSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 text-left">
                <div className="flex items-center gap-3">
                    {icon}
                    <h3 className="font-black text-gray-800">{title}</h3>
                </div>
                <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 pt-0">{children}</div>}
        </div>
    );
};


export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onAddToCart, onClose }) => {
    const [itemQuantity, setItemQuantity] = useState(1);
    const [spiceLevel, setSpiceLevel] = useState(item.customizations?.spice?.[1] || 'Medium');
    const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
    const [selectedAlternatives, setSelectedAlternatives] = useState<{[key: string]: Alternative}>({});
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
    const [isAdded, setIsAdded] = useState(false);

    const toggleRemovedIngredient = (ingredient: string) => {
        setRemovedIngredients(prev => {
            const newRemoved = prev.includes(ingredient) ? prev.filter(i => i !== ingredient) : [...prev, ingredient];
            if (!newRemoved.includes(ingredient)) {
                const newAlts = { ...selectedAlternatives };
                delete newAlts[ingredient];
                setSelectedAlternatives(newAlts);
            }
            return newRemoved;
        });
    };
    
    const handleSelectAlternative = (removedIngredient: string, alternative: Alternative) => {
        setSelectedAlternatives(prev => ({
            ...prev,
            [removedIngredient]: alternative,
        }));
    };

    const toggleAddon = (addon: Addon) => {
        setSelectedAddons(prev => {
            const isSelected = prev.find(a => a.name === addon.name);
            if (isSelected) {
                return prev.filter(a => a.name !== addon.name);
            } else {
                return [...prev, addon];
            }
        });
    };

    const alternativesPrice = useMemo(() => {
        // Fix: Explicitly type `alt` as `Alternative` in the reduce callback.
        // This resolves an issue where `alt` was being inferred as `unknown` from `Object.values`, causing a type error when accessing `alt.price`.
        return Object.values(selectedAlternatives).reduce((sum, alt: Alternative) => sum + (alt.price || 0), 0);
    }, [selectedAlternatives]);

    const addonsPrice = useMemo(() => {
        return selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    }, [selectedAddons]);

    const totalPrice = useMemo(() => (item.price + alternativesPrice + addonsPrice) * itemQuantity, [item.price, itemQuantity, alternativesPrice, addonsPrice]);

    const handleAddToCartClick = () => {
        if (isAdded) return;
        setIsAdded(true);
    };
    
    useEffect(() => {
        if (isAdded) {
            const customizations = {
                spice: spiceLevel,
                removed: removedIngredients,
                alternatives: selectedAlternatives,
            };
            onAddToCart(item, itemQuantity, customizations, totalPrice, specialInstructions, selectedAddons);
            const timer = setTimeout(() => {
                onClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isAdded, item, onClose, onAddToCart, specialInstructions, spiceLevel, removedIngredients, selectedAlternatives, selectedAddons, totalPrice, itemQuantity]);
    
    const remainingFreebies = 0; // Simplified for now

    return (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto pb-32 animate-slide-up">
            <style>{`@keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } } .animate-slide-up { animation: slide-up 0.3s ease-out; }`}</style>
            <div className="relative h-72 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <div className="text-9xl drop-shadow-lg">{item.image}</div>
                <button onClick={onClose} className="absolute top-6 left-6 bg-black/20 text-white rounded-full p-3 shadow-lg active:scale-90 transition-transform"><X size={24} /></button>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <div className="flex items-start gap-3 mb-3">
                        {item.isVeg !== undefined && <div className={`w-6 h-6 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center mt-1`}><div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} /></div>}
                        <h1 className="text-3xl font-black text-gray-800 flex-1">{item.name}</h1>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="flex items-center gap-1 text-green-600"><Star size={16} className="fill-green-600" /><span className="font-bold">{item.rating}</span><span className="text-gray-500">({item.reviews}+)</span></span>
                        <span className="flex items-center gap-1 text-gray-600"><Clock size={16} />{item.time}</span>
                        {item.calories && <span className="flex items-center gap-1 text-gray-600"><Zap size={16} />{item.calories} cal</span>}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-black text-orange-500">${totalPrice.toFixed(2)}</span>
                        {item.originalPrice && <span className="text-xl text-gray-400 line-through">${item.originalPrice}</span>}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50">
                <AccordionSection title="Customize Your Meal" icon={<ChefHat className="text-orange-500" size={20} />} defaultOpen>
                    {item.customizations?.spice && (
                        <div className="mb-4">
                            <h4 className="font-bold text-gray-700 mb-2">Spice Level</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {item.customizations.spice.map(level => (
                                    <button key={level} onClick={() => setSpiceLevel(level)} className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${spiceLevel === level ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 border'}`}>{level}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    {item.customizations?.addons && item.customizations.addons.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-bold text-gray-700 mb-2">Addons</h4>
                            <div className="space-y-2">
                                {item.customizations.addons.map(addon => (
                                    <button key={addon.name} onClick={() => toggleAddon(addon)} className={`w-full flex justify-between items-center p-3 rounded-lg border-2 transition-all ${selectedAddons.find(a => a.name === addon.name) ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200'}`}>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${selectedAddons.find(a => a.name === addon.name) ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                                {selectedAddons.find(a => a.name === addon.name) && <Check size={12} className="text-white"/>}
                                            </div>
                                            <span className="font-semibold text-gray-800">{addon.name}</span>
                                        </div>
                                        <span className="font-bold text-green-600">+${addon.price.toFixed(2)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {item.customizations?.removableIngredients && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-bold text-gray-700 mb-2">Remove Ingredients</h4>
                            <div className="flex flex-wrap gap-2">
                                {item.customizations.removableIngredients.map(ingredient => (
                                    <button key={ingredient} onClick={() => toggleRemovedIngredient(ingredient)} className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all ${removedIngredients.includes(ingredient) ? 'bg-red-500 text-white' : 'bg-white border text-gray-800'}`}>
                                        {removedIngredients.includes(ingredient) ? `No ${ingredient}` : ingredient}
                                    </button>
                                ))}
                            </div>

                            {removedIngredients.map(removedIng => {
                                const alts = item.customizations?.alternatives?.[removedIng];
                                if (!alts) return null;
                                return (
                                    <div key={removedIng} className="mt-4 pt-4 border-t">
                                        <h5 className="font-bold text-gray-700 mb-2">Add instead of {removedIng}? <span className="text-green-600 font-semibold text-xs">({remainingFreebies} free swaps left)</span></h5>
                                        <div className="flex flex-wrap gap-2">
                                        {alts.map(alt => (
                                            <button key={alt.name} onClick={() => handleSelectAlternative(removedIng, alt)} className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${selectedAlternatives[removedIng]?.name === alt.name ? 'bg-green-100 border-green-500 border-2' : 'bg-white border text-gray-800'}`}>
                                                 {selectedAlternatives[removedIng]?.name === alt.name && <Check size={16} className="text-green-600"/>}
                                                <span>{alt.name}</span>
                                                <span className="font-bold text-green-600">{alt.price > 0 ? `+$${alt.price}` : 'FREE'}</span>
                                            </button>
                                        ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </AccordionSection>
                 {item.ingredients && item.ingredients.length > 0 && (
                    <AccordionSection title="Ingredients" icon={<List className="text-blue-500" size={20} />}>
                        <p className="text-gray-600 text-sm">{item.ingredients.join(', ')}.</p>
                    </AccordionSection>
                )}
                {item.allergens && item.allergens.length > 0 && (
                    <AccordionSection title="Allergy Information" icon={<AlertTriangle className="text-red-500" size={20} />}>
                        <p className="text-red-600 text-sm font-semibold">Contains: {item.allergens.join(', ')}. Please be aware if you have any allergies.</p>
                    </AccordionSection>
                )}
            </div>

             <div className="p-6">
                <h3 className="font-black text-gray-800 mb-3">Special Instructions</h3>
                <textarea placeholder="Any specific requests for the chef?" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 resize-none bg-white text-gray-800" rows={3}/>
            </div>


            <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t max-w-md mx-auto">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                        <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))} className="w-10 h-10 bg-white shadow rounded-lg font-black text-gray-800 active:scale-90 transition-transform"><Minus size={20} className="mx-auto" /></button>
                        <span className="font-black text-2xl w-12 text-center text-gray-900">{itemQuantity}</span>
                        <button onClick={() => setItemQuantity(itemQuantity + 1)} className="w-10 h-10 bg-white shadow rounded-lg font-black text-gray-800 active:scale-90 transition-transform"><Plus size={20} className="mx-auto" /></button>
                    </div>
                    <button onClick={handleAddToCartClick} disabled={isAdded} className={`flex-1 py-4 font-black rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-4 ${isAdded ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white`}>
                        {isAdded ? (
                            <>
                                <span>Added!</span>
                                <CheckCircle size={24} />
                            </>
                        ) : (
                           <div className="flex items-center justify-between w-full px-2">
                                <span>ADD TO CART</span>
                                <span>${totalPrice.toFixed(2)}</span>
                           </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
