import { ItemsPurchasedFields, type ItemsPurchased } from "../../types/items";
import { PageHeader } from "../composition/PageHeader";

interface ItemsPurchasedProps {
    itemsPurchased: ItemsPurchased | undefined;
    handleChangeItem: (field: string, value: number) => void;
}

const ItemsPurchasedBox: React.FC<ItemsPurchasedProps> = ({ 
    itemsPurchased, 
    handleChangeItem
}) => {

    return (
        <div className="container-fluid">
            <div className="row" style={{padding: "10px", display: "flex", gap: "20px"}}>
                <img src="/public/img/cart.png" width={100} alt="" />
                <PageHeader 
                    title="Items Purchased"
                />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className=".card border-left-primary shadow h-100 py-2 ">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                {itemsPurchased && Object.entries(ItemsPurchasedFields)
                                .filter(([key, _]) => isNaN(Number(key)))
                                .map(([itemPurchasedField]) => (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{itemPurchasedField.replace("Item ", "")}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <input style={{width: 60}} type="text" value={itemsPurchased[itemPurchasedField as keyof ItemsPurchased]} onChange={(e) => {
                                                handleChangeItem(itemPurchasedField, parseInt(e.target.value) || 0);
                                            }}/>
                                        </div>
                                    </div>
                                ))}
                            </div>                            
                        </div>
                    </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export { ItemsPurchasedBox }