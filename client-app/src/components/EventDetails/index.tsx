/**
 * Author: Aharnish Solanki (B00933563)
 */
import React, { useState, useEffect } from "react";
import {FaHeart,FaRegHeart,FaUser,FaShareAlt,FaCalendarAlt,FaMapMarkedAlt,} from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { useWishlist } from "../../context/WishlistContext";
import Container from "../Container";
import Button from "../UI/Button";
import ImageCarousel from "../ImageCarousel";
import ShareModal from "../ShareModal";
import TicketPurchaseModal from "../TicketPurchaseModal";
import { getEventsbyId } from "../../services/EventService";
import { useNavigate } from "react-router-dom";
import formatDateTime from "../../services/utils";

interface EventDetails {
  details: {
    description: string;
    venue: string;
    additionalInfo?: string;
  };
  _id: string;
  eventName: string;
  organizer: string;
  titlePicture: string;
  pictures: string[];
  topic: string;
  categories: string[];
  eventStartDateTime: string;
  eventEndDateTime: string;
  isActive: boolean;
  isPaidEvent: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface EventDetailsProps {
  eventId: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const [event, setEvent] = useState<EventDetails | null>();
  console.log("event", event);

  const navigate = useNavigate();

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlist.some((e) => e.id === event?._id);

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const urlToShare = window.location.href;

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(eventId as string);
    } else {
      addToWishlist({
        id: event?._id as string,
        name: event?.eventName as string,
        date: event?.eventStartDateTime as any,
        location: event?.details.venue as string,
        description: event?.details.description as string,
        image: event?.titlePicture as string,
      });
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId).then(setEvent);
      console.log("event useeffect ", event);
    }
  }, [eventId]);

  useEffect(() => {
    if (showTicketModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showTicketModal]);

  return (
    <Container>
      <div className="relative bg-white shadow-lg rounded-lg p-6 my-5 mx-auto max-w-7xl">
        <div className="mb-2">
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
            <div className="flex flex-col lg:flex-row justify-between">
              <h1 className="text-3xl lg:text-5xl font-bold text-title-color mb-4 lg:mb-0">
                {event?.eventName}
              </h1>

              <div className="flex-grow"></div>

              <div className="flex items-end lg:items-center space-x-2">
                <button
                  onClick={toggleWishlist}
                  className="text-red-500 flex items-center"
                >
                  {isWishlisted ? (
                    <FaHeart size={30} />
                  ) : (
                    <FaRegHeart size={25} />
                  )}
                </button>
                <Button
                  onClick={() => setShowShareModal(true)}
                  className="text-blue-500 hover:text-blue-700 text-2xl lg:text-3xl"
                  aria-label="Share Event"
                >
                  <FaShareAlt size={18} />
                </Button>
                {/* Share Modal */}
                <ShareModal
                  url={urlToShare}
                  isOpen={showShareModal}
                  onClose={() => setShowShareModal(false)}
                />
              </div>
            </div>
            <div className="mt-4">
              <ImageCarousel images={event?.titlePicture} />
            </div>
          </div>
        </div>

        {/* after image section */}

        <div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 my-4">
            <div className="md:col-span-2 p-4 bg-white rounded-lg shadow">
              <div>
                <div className="flex items-center ml-3 mt-6">
                  <p className="text-2xl">
                    <strong>Organized by</strong>
                  </p>
                  <FaUser size={25} className="mr-2 ml-2" />
                </div>
                <hr
                  className="my-1 border-gray-300 ml-3 mb-4"
                  style={{ width: "26%" }}
                />
                <p className="text-xl text-gray-900  ml-3 mb-4">
                  {event?.organizer}
                </p>

                {/* Date and Time */}
                <div className="flex items-center mx-3 mb-2">
                  <p className="text-2xl">
                    <strong>Date and Time</strong>
                  </p>
                  <FaCalendarAlt size={25} className="mr-2 ml-2" />
                </div>

                <hr
                  className="my-1 border-gray-300 mx-l mb-4 ml-3"
                  style={{ width: "29%" }}
                />

                <div className="flex flex-col ml-3">
                  <div className="flex items-center mb-2">
                    <span className="font-bold min-w-[80px]">From</span>
                    <span className="mr-2 font-bold">:</span>
                    <span className="">
                      {formatDateTime(event?.eventStartDateTime || "")}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="font-bold min-w-[80px]">To</span>
                    <span className="mr-2 font-bold">:</span>
                    <span className="">
                      {formatDateTime(event?.eventEndDateTime || "")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mx-3 mb-2">
                  <p className="text-2xl mr-4">
                    <strong>Venue</strong>
                  </p>
                  <FaMapMarkedAlt size={25} className="mr-2" />
                </div>
                <hr
                  className="my-1 border-gray-300 mx-l ml-3 mb-4"
                  style={{ width: "17%" }}
                />

                <p className="text-gray-900  ml-3 text-xl mb-4">
                  {event?.details?.venue}
                </p>

                <div className="flex flex-col lg:flex-row -mx-4 mt-4"></div>

                <div className="w-full  px-4">
                  <div className="flex items-center mb-2">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                      About the Event
                    </h2>
                    <FcAbout size={25} className="ml-2" />
                  </div>

                  <hr
                    className="flex-grow border-gray-300 mb-2"
                    style={{ height: "1px" }}
                  />
                  <p className="text-gray-700 mb-3 text-justify">
                    {event?.details?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 p-4 bg-gray-100 rounded-lg shadow">
              <div className="w-full px-4 mt-4 ">
                <div className="border p-4 rounded-md bg-white">
                  <h3 className="text-xl lg:text-lg font-bold mb-4 text-center">
                    Get tickets
                  </h3>
                  <div className="mb-4 text-center">
                    <span className="text-lg font-bold">Price: </span>
                    <span className="text-lg font-bold">
                      CA${event?.price?.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={() => setShowTicketModal(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                    color="error"
                  >
                    Register
                  </Button>
                  <TicketPurchaseModal
                    isOpen={showTicketModal}
                    onClose={() => setShowTicketModal(false)}
                    onCheckout={() => setShowTicketModal(false)}
                    event={event}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export async function fetchEventById(eventId: string): Promise<any | null> {
  try {
    const response = await getEventsbyId(eventId);
    if (response?.data) {
      const data = response.data.data;
      const price =
        !data.isPaidEvent || data.price === undefined ? 0 : data.price;
      const event = {
        details: data.details,
        _id: data._id,
        eventName: data.eventName,
        organizer: data.organizer,
        titlePicture: data.titlePicture,
        pictures: data.pictures,
        topic: data.topic,
        categories: data.categories,
        eventStartDateTime: data.eventStartDateTime,
        eventEndDateTime: data.eventEndDateTime,
        isActive: data.isActive,
        isPaidEvent: data.isPaidEvent,
        price: price,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      return event;
    } else {
      console.error("Failed to fetch event:", response.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default EventDetails;
